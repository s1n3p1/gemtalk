import http from 'node:http';
import { readFile,writeFile,rename,mkdir,stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PERSONAS,TOPICS,promptFor,parseReply,publicRoom } from './conversation.js';
import { migrateStore,memberInput,settingsInput,resetSettings,nextPerson,text,LANGUAGES,AVATARS } from './settings.js';
import { LOCALES,localizeMember,topicsFor,t } from './public/i18n.js';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(process.env.GEMTALK_DATA_DIR || path.join(ROOT,'data'));
const STATE_PATH = path.join(DATA,'state.json');
const CLI = process.env.AGY_BIN || (process.platform === 'win32' ? 'agy.exe' : 'agy');
const PORT = Number(process.env.PORT || 3000);
await mkdir(DATA,{ recursive:true,mode:0o700 });
let saved;
try { saved = JSON.parse(await readFile(STATE_PATH,'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const store = migrateStore(saved,PERSONAS);
let writeQueue = Promise.resolve(), mutationQueue = Promise.resolve();
const clients = new Map(), lastViewers = new Map();
let busy = false, timer, activeChild, activeRoomId;
const current = () => store.rooms.find(r => r.id === store.currentId);
const meta = room => ({ id:room.id,topic:room.topic,createdAt:room.createdAt,turns:room.turns,status:room.status,
  language:room.language,personas:room.personas.map(({ id,name,avatar }) => ({ id,name,avatar })) });
const view = () => ({ room:publicRoom(current()), rooms:store.rooms.slice().reverse().map(meta),
  members:store.members, settings:store.settings, languages:LANGUAGES.map(({ id,name }) => ({ id,name })), avatars:AVATARS, topics:TOPICS });
function persist() {
  const payload = JSON.stringify(store);
  writeQueue = writeQueue.catch(() => {}).then(async () => {
    const temp = `${STATE_PATH}.tmp`; await writeFile(temp,payload,{ mode:0o600 }); await rename(temp,STATE_PATH);
  });
  return writeQueue;
}
await persist();
function broadcast() { const data = `event: state\ndata: ${JSON.stringify(view())}\n\n`; for (const res of clients.keys()) res.write(data); }
async function saveAndSend() { await persist(); broadcast(); }
function schedule(delay = 0) {
  clearTimeout(timer);
  timer = setTimeout(() => drive().catch(error => {
    console.error('Conversation storage failure:',error.code || error.name);
    if (current()) { current().status = 'paused'; current().error = 'error_storage'; broadcast(); }
  }),delay);
}
async function agyTurn(room,person) {
  const cwd = path.join(ROOT,'workspaces',room.id,person.id);
  await mkdir(cwd,{ recursive:true,mode:0o700 });
  if (!store.rooms.includes(room)) throw new Error('error_not_found');
  const args = ['--input-format','stream-json','--output-format','stream-json','--model',room.model,
    '--sandbox','--disable-slash-commands','--print-timeout','110s','--log-file',path.join(DATA,`agy-${person.id}.log`)];
  if (person.conversationId) args.push('--conversation',person.conversationId);
  return new Promise((resolve,reject) => {
    const child = spawn(CLI,args,{ cwd,shell:false,windowsHide:true,stdio:['pipe','pipe','pipe'] }); activeChild = child; activeRoomId = room.id;
    let output = '', exceeded = false;
    const timeout = setTimeout(() => child.kill('SIGTERM'),120000);
    child.stdout.on('data',buffer => { output += buffer; if (output.length > 8 * 1024 * 1024) { exceeded = true; child.kill('SIGTERM'); } });
    child.stderr.resume();
    child.stdin.on('error',() => {});
    child.stdin.end(JSON.stringify({ event:'user',message:{ content:promptFor(room,person) } }) + '\n');
    child.on('error',error => { clearTimeout(timeout); if (activeChild === child) { activeChild = null; activeRoomId = null; } reject(error); });
    child.on('close',code => {
      clearTimeout(timeout); if (activeChild === child) { activeChild = null; activeRoomId = null; }
      if (code !== 0 || exceeded) return reject(new Error('error_response'));
      try { resolve(parseReply(output)); } catch (error) { reject(error); }
    });
  });
}
async function drive() {
  if (busy) return;
  const room = current(); if (!room || room.status !== 'running') return;
  const settings = store.settings;
  const watched = [...clients.values()].some(id => id === room.id);
  if (watched) lastViewers.set(room.id,Date.now());
  if (settings.pauseWhenAway && !watched && Date.now() - (lastViewers.get(room.id) || room.createdAt) >= settings.awaySeconds * 1000) {
    room.status = 'paused'; room.reason = 'empty'; await saveAndSend(); return;
  }
  if (settings.maxTurns > 0 && room.turns >= settings.maxTurns) { room.status = 'paused'; room.reason = 'limit'; await saveAndSend(); return; }
  busy = true;
  const person = nextPerson(room);
  room.pending = { speaker:person.id,startedAt:Date.now() };
  const deliveredSeq = room.messages.at(-1)?.seq || 0;
  try {
    await saveAndSend();
    if (!store.rooms.includes(room)) return;
    const reply = await agyTurn(room,person);
    if (!store.rooms.includes(room)) return;
    person.conversationId = reply.id;
    room.messages.push({ id:randomUUID(),seq:(room.messages.at(-1)?.seq || 0)+1,speaker:person.id,name:person.name,text:reply.text,at:Date.now() });
    person.lastSeq = deliveredSeq; room.turns++; room.error = null;
    if (store.settings.maxTurns > 0 && room.turns >= store.settings.maxTurns && room.status === 'running') { room.status = 'paused'; room.reason = 'limit'; }
  } catch (error) { room.status = 'paused'; room.reason = 'error'; room.error = error.message?.startsWith('error_') ? error.message : 'error_cli'; }
  finally { room.pending = null; busy = false; await saveAndSend(); if (current()?.status === 'running') schedule(current().id === room.id ? store.settings.replySeconds * 1000 : 0); }
}
let modelCache = [], modelAt = 0, modelLoading;
async function loadModels(force = false) {
  if (!force && modelCache.length && Date.now() - modelAt < 300000) return modelCache;
  if (modelLoading) return modelLoading;
  modelLoading = new Promise((resolve,reject) => {
    const child = spawn(CLI,['models'],{ shell:false,windowsHide:true,stdio:['ignore','pipe','pipe'] });
    let output = ''; const timeout = setTimeout(() => child.kill('SIGTERM'),20000);
    child.stdout.on('data',data => { output += data; if (output.length > 1024 * 1024) child.kill('SIGTERM'); });
    child.stderr.resume();
    child.on('error',() => { clearTimeout(timeout); reject(new Error('error_cli')); });
    child.on('close',code => {
      clearTimeout(timeout);
      const models = output.split('\n').map(line => line.trim().match(/^([a-z0-9][a-z0-9._-]+)\s+(.+)$/)).filter(Boolean).map(m => ({ id:m[1],name:m[2] }));
      if (code !== 0 || !models.length) return reject(new Error('error_models'));
      modelCache = models; modelAt = Date.now(); resolve(models);
    });
  }).finally(() => modelLoading = null);
  return modelLoading;
}
function fail(status,message) { const error = new Error(message); error.status = status; throw error; }
async function body(req,maxBytes = 16 * 1024 * 1024) {
  let size = 0; const chunks = [];
  for await (const chunk of req) { size += chunk.length; if (size > maxBytes) fail(413,'error_too_large'); chunks.push(chunk); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { fail(400,'error_input'); }
}
function json(res,status,data) { res.writeHead(status,{ 'Content-Type':'application/json; charset=utf-8' }); res.end(JSON.stringify(data)); }
async function mutate(url,input) {
  if (url === '/api/locale') {
    if (!LOCALES.includes(input.locale)) fail(400,'error_language');
    if (!LOCALES.includes(store.settings.uiLanguage)) {
      store.settings.uiLanguage = input.locale;
      if (input.defaultConversation === true) store.settings.language = input.locale;
    }
  } else if (url === '/api/members/save') {
    const existing = input.id ? store.members.find(p => p.id === input.id) : null;
    if (input.id && !existing) fail(404,'error_member');
    const locale = LOCALES.includes(input.locale) ? input.locale : store.settings.uiLanguage || 'ko';
    const person = memberInput(input,existing?.id,existing,locale);
    if (existing) store.members[store.members.indexOf(existing)] = person; else store.members.push(person);
  } else if (url === '/api/members/delete') {
    const index = store.members.findIndex(p => p.id === input.id); if (index < 0) fail(404,'error_member');
    store.members.splice(index,1);
  } else if (url === '/api/settings') {
    store.settings = settingsInput({ ...input,uiLanguage:input.uiLanguage ?? store.settings.uiLanguage },await loadModels());
  } else if (url === '/api/theme') {
    if (!['light','dark'].includes(input.theme)) fail(400,'error_input');
    store.settings.theme = input.theme;
  } else if (url === '/api/settings/reset') {
    if (input.confirmed !== true) fail(400,'error_confirm');
    store.settings = resetSettings(store.settings.uiLanguage || input.locale);
  } else if (url === '/api/history/delete') {
    if (input.confirmed !== true) fail(400,'error_confirm');
    for (const room of store.rooms) { room.status = 'paused'; room.reason = 'manual'; }
    clearTimeout(timer); activeChild?.kill('SIGTERM');
    store.rooms = []; store.currentId = null; lastViewers.clear();
  } else if (url === '/api/rooms/delete') {
    if (input.confirmed !== true) fail(400,'error_confirm');
    const index = store.rooms.findIndex(room => room.id === input.roomId);
    if (index < 0) fail(404,'error_not_found');
    const room = store.rooms[index]; room.status = 'paused'; room.reason = 'manual';
    if (activeRoomId === room.id) activeChild?.kill('SIGTERM');
    if (store.currentId === room.id) { clearTimeout(timer); store.currentId = null; }
    store.rooms.splice(index,1); lastViewers.delete(room.id);
  } else if (url === '/api/rooms') {
    const ids = input.memberIds;
    if (!Array.isArray(ids) || ids.length < 2 || new Set(ids).size !== ids.length) fail(400,'error_members');
    const language = input.language || store.settings.language;
    if (!LANGUAGES.some(l => l.id === language)) fail(400,'error_language');
    const personas = ids.map(id => { const p = store.members.find(p => p.id === id); if (!p) fail(400,'error_member'); return structuredClone(localizeMember(p,language)); });
    const topics = topicsFor(language);
    const room = { id:randomUUID(),topic:text(input.topic || topics[Math.floor(Math.random()*topics.length)],300,'화제'),
      personas,language,model:store.settings.model,createdAt:Date.now(),status:'running',turns:0,messages:[],pending:null,reason:null,error:null };
    if (current()) { current().status = 'paused'; current().reason = 'new'; }
    store.rooms.push(room); store.currentId = room.id; lastViewers.set(room.id,Date.now());
  } else if (url === '/api/control') {
    const room = store.rooms.find(r => r.id === input.roomId); if (!room) fail(404,'error_not_found');
    if (input.action === 'pause') { room.status = 'paused'; room.reason = 'manual'; }
    else if (input.action === 'resume') {
      if (store.settings.maxTurns > 0 && room.turns >= store.settings.maxTurns) fail(409,'error_limit');
      const old = current(); if (old && old.id !== room.id) { old.status = 'paused'; old.reason = 'new'; }
      store.currentId = room.id; room.status = 'running'; room.error = null; room.reason = null; lastViewers.set(room.id,Date.now());
    } else fail(400,'error_action');
  } else if (url === '/api/interject') {
    const room = store.rooms.find(r => r.id === input.roomId); if (!room) fail(404,'error_not_found');
    const message = text(input.text,1000,'한마디');
    if (room.messages.at(-1)?.speaker === 'viewer') fail(409,'error_wait');
    room.messages.push({ id:randomUUID(),seq:(room.messages.at(-1)?.seq || 0)+1,speaker:'viewer',name:'나',text:message,at:Date.now() });
  } else fail(404,'error_not_found');
  await saveAndSend(); if (current()?.status === 'running') schedule(); return view();
}
const MIME = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.webmanifest':'application/manifest+json','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8' };
const server = http.createServer(async (req,res) => {
  let locale = store.settings.uiLanguage || 'ko';
  res.setHeader('Cache-Control','private, no-store'); res.setHeader('CDN-Cache-Control','no-store'); res.setHeader('Cloudflare-CDN-Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff'); res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive'); res.setHeader('Referrer-Policy','same-origin');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https: http:; connect-src 'self'; font-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'");
  try {
    const url = new URL(req.url,'http://localhost');
    const requestedLocale = url.searchParams.get('locale');
    if (LOCALES.includes(requestedLocale)) locale = requestedLocale;
    if (req.method === 'POST') {
      const origin = req.headers.origin, host = req.headers['x-forwarded-host'] || req.headers.host;
      if (req.headers['sec-fetch-site'] === 'cross-site' || (origin && new URL(origin).host !== host)) fail(403,'error_origin');
      const input = await body(req,url.pathname === '/api/members/save' ? Infinity : undefined); const task = mutationQueue.catch(() => {}).then(() => mutate(url.pathname,input)); mutationQueue = task;
      return json(res,200,await task);
    }
    if (!['GET','HEAD'].includes(req.method)) fail(405,'error_method');
    if (url.pathname === '/api/state') return json(res,200,view());
    if (url.pathname === '/api/models') { try { return json(res,200,{ models:await loadModels(url.searchParams.has('refresh')) }); } catch (error) { fail(503,error.message); } }
    if (url.pathname.startsWith('/api/rooms/')) { const room = store.rooms.find(r => r.id === url.pathname.slice('/api/rooms/'.length)); if (!room) fail(404,'error_not_found'); return json(res,200,{ room:publicRoom(room) }); }
    if (url.pathname === '/api/events') {
      const watching = url.searchParams.get('room') || null;
      res.writeHead(200,{ 'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-store, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no' });
      res.flushHeaders(); clients.set(res,watching); if (watching) lastViewers.set(watching,Date.now());
      res.write(`event: state\ndata: ${JSON.stringify(view())}\n\n`);
      const heartbeat = setInterval(() => { res.write(': heartbeat\n\n'); if (watching) lastViewers.set(watching,Date.now()); },20000);
      req.on('close',() => { clearInterval(heartbeat); clients.delete(res); if (watching) lastViewers.set(watching,Date.now()); }); return;
    }
    if (url.pathname === '/healthz') return json(res,200,{ status:'ok',model:store.settings.model });
    const name = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1);
    const filename = path.resolve(ROOT,'public',name); if (!filename.startsWith(`${path.join(ROOT,'public')}${path.sep}`)) fail(404,'error_not_found');
    const file = await stat(filename).catch(() => null); if (!file?.isFile()) fail(404,'error_not_found');
    res.setHeader('Content-Type',MIME[path.extname(filename)] || 'application/octet-stream');
    if (name.startsWith('fonts/')) res.setHeader('Cache-Control','public, max-age=31536000, immutable');
    if (req.method === 'HEAD') return res.end(); res.end(await readFile(filename));
  } catch (error) {
    const code = error.status ? error.message : 'error_connection';
    if (!res.headersSent) json(res,error.status || 500,{ error:t(locale,code),code }); else res.end();
  }
});
server.listen(PORT,'127.0.0.1',() => console.log(`GemTalk listening on loopback:${PORT}`));
function shutdown() {
  clearTimeout(timer); activeChild?.kill('SIGTERM');
  for (const room of store.rooms) if (room.status === 'running') { room.status = 'paused'; room.reason = 'restart'; }
  persist().finally(() => process.exit(0));
}
process.on('SIGTERM',shutdown);
process.on('SIGINT',shutdown);
