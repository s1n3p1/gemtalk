import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReply, promptFor, PERSONAS, publicRoom } from './conversation.js';

test('accepts the live agy JSON envelope and leaves the actual reply intact', () => {
  const reply = parseReply('warning: an optional integration was unavailable\n' + JSON.stringify({
    conversation_id: '9054977c-774a-4300-851f-1f29e039a2b7', status: 'SUCCESS',
    response: '안녕, 요즘 별일 없이 잘 지내?\n', duration_seconds: 4.1, num_turns: 1
  }));
  assert.equal(reply.text, '안녕, 요즘 별일 없이 잘 지내?');
  assert.equal(reply.id, '9054977c-774a-4300-851f-1f29e039a2b7');
});

test('failed or truncated CLI output cannot become a successful chat message', () => {
  for (const output of ['', '{"conversation_id":', JSON.stringify({ conversation_id:'9054977c-774a-4300-851f-1f29e039a2b7', status:'ERROR', response:'internal error details' })]) {
    assert.throws(() => parseReply(output), /error_response/);
  }
});

test('a returning persona hears interjections that arrived during its previous reply', () => {
  const sol = { ...PERSONAS[0], conversationId:'9054977c-774a-4300-851f-1f29e039a2b7', lastSeq:1 };
  const room = { topic:'야식', personas:PERSONAS, messages:[
    { seq:1, speaker:'mo', name:'모', text:'누룽지.' },
    { seq:2, speaker:'viewer', name:'나', text:'셋이서 야식 가게 이름을 정해봐.' },
    { seq:3, speaker:'sol', name:'솔', text:'감자튀김.' },
    { seq:4, speaker:'ru', name:'루', text:'가래떡.' }
  ] };
  const prompt = promptFor(room, sol);
  assert.ok(prompt.includes('나: 셋이서 야식 가게 이름을 정해봐.'));
  assert.ok(prompt.includes('루: 가래떡.'));
  assert.ok(!prompt.includes('모: 누룽지.'));
  assert.ok(!prompt.includes('솔: 감자튀김.'));
});

test('browser state excludes CLI session handles and internal pending metadata', () => {
  const room = { id:'room', personas:[{ ...PERSONAS[0], conversationId:'private-session', lastSeq:7 }],
    pending:{ speaker:'sol', startedAt:123 }, messages:[] };
  const json = JSON.stringify(publicRoom(room));
  assert.ok(!json.includes('private-session'));
  assert.ok(!json.includes('lastSeq'));
  assert.ok(!json.includes('startedAt'));
});
