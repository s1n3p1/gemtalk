import test from 'node:test';
import assert from 'node:assert/strict';
import { UI,LOCALES,NATIVE_LANGUAGES,CONTENT,CHARACTER_IDS,characterProfile,localizeMember,languageName } from './public/i18n.js';
import { LANGUAGES,migrateStore,memberInput } from './settings.js';

test('language choices follow the product order and keep each label attached to its language', () => {
  const order = ['ko','en','fr','es','pt','de','zh','ja','ar','hi'];
  assert.deepEqual(LOCALES,order);
  assert.deepEqual(LANGUAGES.map(language => language.id),order);
  assert.deepEqual(Object.keys(UI),order);
  assert.deepEqual(NATIVE_LANGUAGES,LANGUAGES.map(language => language.name));
  assert.deepEqual(order.map(code => languageName('en',code)),
    ['Korean','English','French','Spanish','Portuguese','German','Chinese','Japanese','Arabic','Hindi']);
  for (const language of LANGUAGES) assert.equal(languageName(language.id,language.id),language.name);
});

test('all supported languages cover the interface and translated defaults without Korean leakage', () => {
  const keys = Object.keys(UI.ko).sort();
  for (const locale of LOCALES) {
    assert.deepEqual(Object.keys(UI[locale]).sort(),keys);
    assert.equal(CONTENT[locale].characters.length,6);
    assert.equal(CONTENT[locale].languages.length,10);
    if (locale !== 'ko') assert.doesNotMatch(JSON.stringify([UI[locale],CONTENT[locale]]),/[\uac00-\ud7a3\u3131-\u318e]/);
  }
});

test('version 2 migration preserves history, session handles, limits and custom members', () => {
  const defaults = ['sol','mo','ru'].map(id => characterProfile(id));
  const custom = { id:'custom',name:'내 이름',label:'내 소개',personality:'내 성격',avatar:{ type:'builtin',id:'bear' } };
  const room = { id:'kept-room',language:'ko',model:'gemini-3.8-flash-low',limit:120,status:'paused',messages:[{ id:'kept-message',text:'대화 원문' }],
    personas:[{ ...defaults[0],conversationId:'kept-session',lastSeq:11 }],pending:null };
  const migrated = migrateStore({ version:2,settings:{ maxTurns:60 },members:[...defaults,custom],rooms:[structuredClone(room)] },defaults);
  assert.deepEqual(migrated.rooms[0],room);
  assert.equal(migrated.settings.maxTurns,60);
  for (const locale of LOCALES) assert.deepEqual(localizeMember(migrated.members.at(-1),locale),custom);
});

test('saving a translated default without edits keeps it translatable, including after avatar changes', () => {
  const original = characterProfile('sol');
  const displayed = localizeMember(original,'ja');
  const saved = memberInput({ ...displayed,avatar:{ type:'image',src:'https://example.com/photo.png' } },original.id,original,'ja');
  assert.deepEqual(saved.customFields,{});
  assert.equal(saved.name,original.name);
  assert.equal(localizeMember(saved,'en').name,'Sol');
  assert.equal(localizeMember(saved,'hi').personality,characterProfile('sol','hi').personality);
  assert.equal(saved.avatar.type,'image');
});

test('an edited default field survives language changes while untouched fields keep translating', () => {
  for (const id of CHARACTER_IDS) {
    const original = characterProfile(id);
    const displayed = localizeMember(original,'en');
    const saved = memberInput({ ...displayed,name:'My own name' },id,original,'en');
    const next = localizeMember(saved,'fr');
    assert.equal(next.name,'My own name');
    assert.equal(next.personality,characterProfile(id,'fr').personality);
    assert.equal(next.label,characterProfile(id,'fr').label);
    const savedAgain = memberInput(next,id,saved,'fr');
    assert.equal(localizeMember(savedAgain,'ja').name,'My own name');
  }
});
