import test from 'node:test';
import assert from 'node:assert/strict';
import { migrateStore,nextPerson,memberInput,DEFAULT_SETTINGS,resetSettings } from './settings.js';
import { PERSONAS,promptFor,parseReply } from './conversation.js';
test('settings reset returns to fresh defaults in the chosen interface language',() => {
  const defaults = structuredClone(DEFAULT_SETTINGS);
  for (const locale of ['ko','en','ja','hi','ar']) {
    assert.deepEqual(resetSettings(locale),{ ...defaults,uiLanguage:locale,language:locale });
    assert.equal(resetSettings(locale).theme,'system');
    assert.equal(resetSettings(locale).maxTurns,0);
  }
  assert.deepEqual(DEFAULT_SETTINGS,defaults);
});
test('legacy rooms keep transcripts and all session handles while removing the old reply limit',() => {
  const input = { version:1,currentId:'legacy',rooms:[{ id:'legacy',limit:30,status:'running',turns:30,messages:[{ id:'message',text:'기존 대화' }],personas:PERSONAS.map((p,i) => ({ ...p,conversationId:`session-${i}`,lastSeq:i })) }] };
  const result = migrateStore(structuredClone(input),PERSONAS);
  assert.equal(result.settings.maxTurns,0); assert.equal(result.settings.pauseWhenAway,true); assert.equal(result.settings.theme,'system');
  assert.equal(result.rooms[0].status,'paused'); assert.ok(!('limit' in result.rooms[0]));
  assert.deepEqual(result.rooms[0].messages,input.rooms[0].messages);
  assert.deepEqual(result.rooms[0].personas.map(p => p.conversationId),['session-0','session-1','session-2']);
  assert.ok(result.members.every(p => !('conversationId' in p)));
});
test('each round includes all participants without consecutive self-turns for groups of 2, 6 and 101',() => {
  for (const count of [2,6,101]) {
    const room = { personas:Array.from({ length:count },(_,id) => ({ id })),turns:0 };
    let previous;
    for (let round=0;round<3;round++) { const ids=[]; for (let i=0;i<count;i++) { const id=nextPerson(room).id; assert.notEqual(id,previous); previous=id; ids.push(id); room.turns++; } assert.equal(new Set(ids).size,count); }
  }
});
test('resuming a large group does not silently drop unread participant messages',() => {
  const messages = Array.from({ length:50 },(_,i) => ({ seq:i+1,speaker:`friend-${i}`,name:`friend-${i}`,text:`unique-message-${i}` }));
  const prompt = promptFor({ topic:'music',language:'es',personas:PERSONAS,messages },{ ...PERSONAS[0],conversationId:'session',lastSeq:0 });
  assert.ok(prompt.includes('Spanish')); assert.ok(prompt.includes('unique-message-0')); assert.ok(prompt.includes('unique-message-49'));
});
test('streaming input still accepts only the successful terminal result',() => {
  const reply = parseReply(JSON.stringify({ event:'init',conversation_id:'9054977c-774a-4300-851f-1f29e039a2b7' })+'\n'+JSON.stringify({ event:'result',result:{ conversation_id:'9054977c-774a-4300-851f-1f29e039a2b7',status:'SUCCESS',response:'The actual response.' } }));
  assert.equal(reply.text,'The actual response.');
  assert.throws(() => parseReply(JSON.stringify({ event:'init',conversation_id:reply.id })));
});
test('custom profile photos reject executable URLs and accept uploaded and remote images',() => {
  const person = { name:'Custom',personality:'Quiet',avatar:{ type:'image',src:'javascript:alert(1)' } };
  assert.throws(() => memberInput(person));
  assert.throws(() => memberInput({ ...person,avatar:{ type:'image',src:'data:image/svg+xml;base64,abcd' } }));
  assert.equal(memberInput({ ...person,avatar:{ type:'image',src:'https://example.org/avatar.png' } }).avatar.src,'https://example.org/avatar.png');
  const uploaded = 'data:image/png;base64,'+'A'.repeat(3 * 1024 * 1024);
  assert.equal(memberInput({ ...person,avatar:{ type:'image',src:uploaded } }).avatar.src,uploaded);
  assert.equal(DEFAULT_SETTINGS.maxTurns,0);
});
