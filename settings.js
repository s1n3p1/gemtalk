import { randomUUID } from 'node:crypto';
import { LOCALES,annotateTemplate,localizeMember } from './public/i18n.js';
export const AVATARS = ['sol', 'mo', 'ru', 'bear', 'duck', 'fox'];
export const LANGUAGES = [
  { id:'ko', name:'한국어', prompt:'Korean, using natural casual speech (반말)' },
  { id:'en', name:'English', prompt:'English' },
  { id:'fr', name:'Français', prompt:'French' },
  { id:'es', name:'Español', prompt:'Spanish' },
  { id:'pt', name:'Português', prompt:'Portuguese' },
  { id:'de', name:'Deutsch', prompt:'German' },
  { id:'zh', name:'中文', prompt:'Simplified Chinese' },
  { id:'ja', name:'日本語', prompt:'Japanese' },
  { id:'ar', name:'العربية', prompt:'Arabic' },
  { id:'hi', name:'हिन्दी', prompt:'Hindi' }
];
export const DEFAULT_SETTINGS = { model:process.env.AGY_MODEL || 'gemini-3.8-flash-low',uiLanguage:null,
  language:'ko', theme:'system', maxTurns:0, pauseWhenAway:true, awaySeconds:90, replySeconds:3, animation:true };
export function resetSettings(locale) {
  const language = LOCALES.includes(locale) ? locale : 'ko';
  return { ...DEFAULT_SETTINGS,uiLanguage:language,language };
}
export function avatarFor(person) { return person.avatar || { type:'builtin', id:AVATARS.includes(person.id) ? person.id : 'sol' }; }
export function migrateStore(input, defaults) {
  const store = input || { rooms:[], currentId:null };
  const legacy = (store.version || 1) < 2;
  store.members ||= (store.rooms.find(r => r.id === store.currentId)?.personas || defaults)
    .map(({ id, name, label, color, personality, avatar }) => ({ id, name, label, color, personality, avatar:avatar || avatarFor({ id }) }));
  store.settings = { ...DEFAULT_SETTINGS, ...store.settings };
  store.members = store.members.map(annotateTemplate);
  for (const room of store.rooms) {
    room.language ||= 'ko'; room.model ||= DEFAULT_SETTINGS.model;
    room.personas = room.personas.map(p => annotateTemplate({ ...p,avatar:p.avatar || avatarFor(p) }));
    if (legacy) delete room.limit;
    if (room.status === 'running') { room.status = 'paused'; room.reason = 'restart'; }
    room.pending = null;
  }
  store.version = 3;
  return store;
}
export function invalid(message) { const e = new Error(message); e.status = 400; throw e; }
export function text(value, max, label) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) invalid('error_input');
  return value.trim();
}
export function memberInput(input, id = randomUUID(), existing, locale = 'ko') {
  const avatar = input.avatar;
  if (avatar?.type === 'builtin') { if (!AVATARS.includes(avatar.id)) invalid('error_input'); }
  else if (avatar?.type === 'image') {
    if (typeof avatar.src !== 'string') invalid('photo_error');
    if (!/^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(avatar.src)) {
      let url; try { url = new URL(avatar.src); } catch { invalid('error_input'); }
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) invalid('error_input');
    }
  } else invalid('error_input');
  const result = { id, name:text(input.name,80,'이름'), personality:text(input.personality,4000,'성격'),
    label:typeof input.label === 'string' ? input.label.slice(0,80) : '', avatar:structuredClone(avatar) };
  if (existing?.template) {
    const displayed = localizeMember(existing,locale);
    result.template = existing.template; result.customFields = { ...existing.customFields };
    for (const key of ['name','label','personality']) {
      if (result[key] === displayed[key]) result[key] = existing[key];
      else result.customFields[key] = true;
    }
  }
  return result;
}
export function settingsInput(input, models) {
  const next = {};
  next.uiLanguage = input.uiLanguage ?? null;
  if (next.uiLanguage !== null && !LOCALES.includes(next.uiLanguage)) invalid('error_language');
  for (const key of ['theme','language','model','maxTurns','pauseWhenAway','awaySeconds','replySeconds','animation']) {
    if (!(key in input)) invalid('error_input');
    next[key] = input[key];
  }
  if (!['system','light','dark'].includes(next.theme) || !LANGUAGES.some(l => l.id === next.language)) invalid('error_input');
  if (!models.some(m => m.id === next.model)) invalid('error_models');
  for (const [key,min,max] of [['maxTurns',0,Number.MAX_SAFE_INTEGER],['awaySeconds',15,3600],['replySeconds',0,600]]) {
    if (!Number.isSafeInteger(next[key]) || next[key] < min || next[key] > max) invalid('error_input');
  }
  if (typeof next.pauseWhenAway !== 'boolean' || typeof next.animation !== 'boolean') invalid('error_input');
  return next;
}
export function nextPerson(room) {
  const count = room.personas.length;
  const index = room.turns % count;
  const swapped = count > 2 && Math.floor(room.turns / count) % 2;
  return room.personas[swapped && index < 2 ? 1 - index : index];
}
