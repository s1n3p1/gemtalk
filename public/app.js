import { avatar } from './avatars.js?v=18';
import { LOCALES,NATIVE_LANGUAGES,localizeMember,languageName,topicsFor,t } from './i18n.js?v=18';
const $ = s => document.querySelector(s);
const escape = s => String(s).replace(/[&<>"']/g,c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const base = new URL('./',location.href);
let locale = null, localeChoice = LOCALES.includes(navigator.language?.split('-')[0]) ? navigator.language.split('-')[0] : 'en', connectionStatus = 'connecting';
try { localStorage.removeItem('gemtalk-locale'); } catch {}
const tr = (key,variables) => t(locale || 'en',key,variables);
const profile = person => localizeMember(person,locale || 'en');
const api = name => { const url = new URL(`api/${name}`,base); url.searchParams.set('locale',locale || 'en'); return url; };
let state, selectedId = null, cachedRoom, renderedRoom, renderedIds = new Set(), follow = true, source, watchKey;
let editingId = null, chosenAvatar, toastTimer, models = [], memberFingerprint = '', pendingAction = null, deletingRoomId = null, actionBusy = false;
const stamp = ms => new Intl.DateTimeFormat(locale || 'en',{ month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false }).format(new Date(ms));
function toast(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true,4500); }
async function request(name,body) {
  const response = await fetch(api(name),body === undefined ? {} : { method:'POST',headers:{ 'Content-Type':'application/json' },body:JSON.stringify({ locale:locale || 'en',...body }) });
  const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.code ? tr(data.code) : tr('error_connection')); return data;
}
async function post(name,body) { state = await request(name,body); render(); return state; }
function theme(value) {
  document.documentElement.dataset.theme = value;
  const dark = value === 'dark' || (value === 'system' && matchMedia('(prefers-color-scheme:dark)').matches);
  const button = $('#theme-button');
  button.dataset.mode = dark ? 'dark' : 'light';
  button.setAttribute('aria-label',tr(dark ? 'light' : 'dark'));
  button.title = tr(dark ? 'light' : 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
  try { localStorage.setItem('gemtalk-theme',value); } catch {}
}
$('#theme-button').onclick = async () => {
  if (!state) return;
  const button = $('#theme-button'); button.disabled = true;
  try { await post('theme',{theme:button.dataset.mode === 'dark' ? 'light' : 'dark'}); }
  catch (error) { toast(error.message); }
  finally { button.disabled = false; }
};
try { theme(localStorage.getItem('gemtalk-theme') || 'system'); } catch { document.documentElement.dataset.theme = 'system'; }
function languageOptions(target,selected) { target.innerHTML = state.languages.map(l => `<option value="${l.id}">${escape(languageName(locale || 'en',l.id))}</option>`).join(''); target.value = selected; }
function modelName(id) {
  const name = models.find(m => m.id === id)?.name || id.replace('gemini-','Gemini ').replace('flash','Flash').replace('pro','Pro').replace(/-/g,' ');
  return name.replace(/\s+(low|medium|high)$/i,(_,strength) => ` (${strength[0].toUpperCase()+strength.slice(1).toLowerCase()})`);
}
function room() { return state?.room?.id === selectedId ? state.room : cachedRoom?.id === selectedId ? cachedRoom : null; }
function watch() {
  const key = !locale || document.hidden || $('#locale-dialog').open ? '' : selectedId || '';
  if (source && watchKey === key) return;
  source?.close(); watchKey = key; const url = api('events'); if (key) url.searchParams.set('room',key);
  source = new EventSource(url);
  source.addEventListener('state',event => {
    try { state = JSON.parse(event.data); render(); connectionStatus = 'connected'; $('#connection').textContent = tr(connectionStatus);
      const meta = state.rooms.find(r => r.id === selectedId);
      if (selectedId && state.room?.id !== selectedId && cachedRoom && meta?.turns !== cachedRoom.turns) loadRoom(selectedId);
    } catch { connectionStatus = 'reconnecting'; $('#connection').textContent = tr(connectionStatus); }
  });
  source.onopen = () => { connectionStatus = 'connected'; $('#connection').textContent = tr(connectionStatus); };
  source.onerror = () => { connectionStatus = 'reconnecting'; $('#connection').textContent = tr(connectionStatus); };
}
async function loadRoom(id) {
  try { const result = await request(`rooms/${encodeURIComponent(id)}`); if (id !== selectedId) return; cachedRoom = result.room; render(); }
  catch (error) { toast(error.message); location.hash = ''; }
}
function route() {
  const match = location.hash.match(/^#room\/([a-z0-9-]+)$/); selectedId = match?.[1] || null; cachedRoom = null;
  renderedRoom = null; renderedIds.clear(); follow = true; render(); watch();
  if (selectedId && state?.room?.id !== selectedId) loadRoom(selectedId);
  window.scrollTo({ top:0,behavior:'instant' });
}
function render() {
  if (!state) return;
  const configuredLocale = state.settings.uiLanguage;
  if (!LOCALES.includes(configuredLocale)) { initializeLocale(); return; }
  if (locale !== configuredLocale) { applyLocale(configuredLocale); return; }
  theme(state.settings.theme);
  if (selectedId && !state.rooms.some(r => r.id === selectedId)) { selectedId = null; cachedRoom = null; renderedRoom = null; renderedIds.clear(); location.hash = ''; }
  document.body.dataset.motion = state.settings.animation ? 'on' : 'off';
  $('#list-model').textContent = modelName(state.settings.model);
  const fingerprint = locale + JSON.stringify(state.members);
  if (fingerprint !== memberFingerprint) {
    memberFingerprint = fingerprint;
    $('#cast').innerHTML = state.members.map(profile).map(p => `<button class="cast-card" data-person="${escape(p.id)}" aria-label="${escape(tr('edit_member'))}: ${escape(p.name)}">${avatar(p,'cast-avatar')}<span class="cast-copy"><span class="cast-name">${escape(p.name)}</span><span class="cast-label">${escape(p.label || p.personality)}</span></span><span class="cast-arrow" aria-hidden="true">↗</span></button>`).join('');
  }
  $('#list-view').hidden = !!selectedId; $('#chat-view').hidden = !selectedId; $('#back-list').hidden = !selectedId;
  if (!selectedId) {
    $('#list-empty').hidden = !!state.rooms.length;
    $('.empty-avatars').innerHTML = state.members.filter(p => p.avatar.type === 'builtin').slice(0,3).map(p => avatar(p)).join('');
    $('#room-list').innerHTML = state.rooms.map(r => `<div class="room-card" data-room="${r.id}"><a class="room-card-open" href="#room/${r.id}" aria-label="${escape(r.topic)}"></a><span class="room-card-avatars ${r.personas.length <= 2 ? 'compact' : ''}">${r.personas.slice(0,4).map(p => avatar(p)).join('')}${r.personas.length > 4 ? `<span class="more-members">+${r.personas.length-4}</span>` : ''}</span><span class="room-card-copy"><strong class="user-content">${escape(r.topic)}</strong><span class="room-card-meta">${stamp(r.createdAt)} <span>·</span> ${tr('reply_count',{count:r.turns})} <span>·</span> <span class="room-card-people">${tr('member_count',{count:r.personas.length})} <span>·</span> <span class="room-card-status ${r.status === 'running' ? 'running' : ''}">${tr(r.status === 'running' ? 'live' : 'paused')}</span></span></span></span><span class="room-card-trailing"><button type="button" class="icon-button room-delete" data-delete-room="${r.id}" title="${escape(tr('delete_room'))}" aria-label="${escape(tr('delete_room'))}: ${escape(r.topic)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6m4-6v6"/></svg></button></span></div>`).join(''); return;
  }
  const r = room(); if (!r) return;
  const people = r.personas.map(profile);
  const live = r.status === 'running', pending = !!r.thinking;
  $('#status-text').textContent = tr(live ? 'live' : pending ? 'finishing' : 'paused');
  $('#status-dot').classList.toggle('live',live); $('#turn-count').textContent = tr('reply_count',{count:r.turns});
  $('#topic-title').textContent = r.topic;
  $('#room-details').textContent = `${tr('member_count',{count:people.length})} · ${languageName(locale,r.language)} · ${modelName(r.model)}`;
  $('#play-label').textContent = tr(live ? 'pause' : pending ? 'finish_reply' : 'resume'); $('#play-symbol').textContent = live ? 'Ⅱ' : '▷';
  $('#play').disabled = pending && !live;
  const stage = people.filter(p => p.avatar?.type === 'builtin');
  $('#room-scene').hidden = stage.length === 0;
  $('#scene-people').innerHTML = stage.map(p => `<div class="scene-person ${r.thinking === p.id ? 'is-speaking' : ''}">${avatar(p)}</div>`).join('');
  const changedRoom = renderedRoom !== r.id;
  if (changedRoom) { renderedRoom = r.id; renderedIds.clear(); $('#messages').replaceChildren(); }
  let added = false;
  for (const message of r.messages) {
    if (renderedIds.has(message.id)) continue;
    renderedIds.add(message.id); const person = people.find(p => p.id === message.speaker);
    const node = document.createElement('article'); node.className = `message ${person ? '' : 'viewer'}`;
    node.innerHTML = `${person ? avatar(person,'message-avatar') : '<span class="viewer-mark" aria-hidden="true">↗</span>'}<div><div class="message-meta"><span class="message-name">${escape(person?.name || (message.speaker === 'viewer' ? tr('viewer') : message.name))}</span><time class="message-time" datetime="${new Date(message.at).toISOString()}">${stamp(message.at)}</time></div><p class="message-text"></p></div>`;
    node.querySelector('p').textContent = message.text; $('#messages').append(node); added = true;
  }
  $('#thinking').hidden = !pending;
  if (pending) { const person = people.find(p => p.id === r.thinking); $('#thinking').innerHTML = `${avatar(person,'message-avatar')}<span>${escape(tr('thinking',{name:person?.name || tr('member')}))}</span><span class="typing-dots" aria-hidden="true"><i></i><i></i><i></i></span>`; }
  const reason = r.error ? tr(r.error.startsWith('error_') ? r.error : 'error_response') : r.reason ? tr(`reason_${r.reason}`) : '';
  $('#room-notice').hidden = live || pending || !reason; $('#room-notice').textContent = reason || ''; $('#room-notice').classList.toggle('error',!!r.error);
  if (added && !changedRoom && follow) requestAnimationFrame(() => window.scrollTo({ top:document.documentElement.scrollHeight,behavior:'instant' }));
  else if (added && !changedRoom) $('#jump-live').hidden = false;
}
function openNew(topic = '') {
  if (!state) return;
  $('#new-topic').value = topic; $('#new-error').hidden = true;
  $('#new-topic-chips').innerHTML = topicsFor(locale).map(t => `<button type="button" class="topic-chip">${escape(t)}</button>`).join('');
  $('#member-choices').innerHTML = state.members.map(profile).map(p => `<label class="member-choice"><input type="checkbox" value="${p.id}" checked>${avatar(p)}<span>${escape(p.name)}</span></label>`).join('');
  $('#select-all').textContent = tr('deselect_all'); languageOptions($('#new-language'),state.settings.language); $('#new-dialog').showModal(); $('#new-dialog').scrollTop = 0;
}
for (const id of ['list-new','empty-new']) $('#'+id).onclick = () => openNew();
$('#new-topic-chips').onclick = event => { if (event.target.matches('button')) $('#new-topic').value = event.target.textContent; };
$('#select-all').onclick = () => { const boxes = [...$('#member-choices').querySelectorAll('input')]; const all = boxes.every(b => b.checked); boxes.forEach(b => b.checked = !all); $('#select-all').textContent = tr(all ? 'select_all' : 'deselect_all'); };
$('#new-form').onsubmit = async event => {
  event.preventDefault(); event.submitter.disabled = true;
  try { const data = await post('rooms',{ topic:$('#new-topic').value,memberIds:[...$('#member-choices').querySelectorAll('input:checked')].map(b => b.value),language:$('#new-language').value }); $('#new-dialog').close(); location.hash = `room/${data.room.id}`; }
  catch (error) { $('#new-error').textContent = error.message; $('#new-error').hidden = false; }
  finally { event.submitter.disabled = false; }
};
function previewAvatar() {
  $('#member-preview').innerHTML = avatar({ avatar:chosenAvatar });
  $('#avatar-options').innerHTML = state.avatars.map(id => `<button type="button" data-avatar="${id}" aria-label="${escape(tr('avatar_'+id))}" aria-pressed="${chosenAvatar.type === 'builtin' && chosenAvatar.id === id}">${avatar({ avatar:{ type:'builtin',id } })}</button>`).join('');
}
function openMember(id) {
  if (!state) return;
  const original = state.members.find(m => m.id === id); const p = original ? profile(original) : null; editingId = p?.id || null;
  chosenAvatar = structuredClone(p?.avatar || { type:'builtin',id:state.avatars[state.members.length % state.avatars.length] });
  $('#member-title').textContent = tr(p ? 'edit_member' : 'add_member');
  $('#member-name').value = p?.name || ''; $('#member-personality').value = p?.personality || ''; $('#member-label').value = p?.label || '';
  $('#avatar-file').value = ''; $('#avatar-url').hidden = true; $('#avatar-url').value = chosenAvatar.type === 'image' && chosenAvatar.src.startsWith('http') ? chosenAvatar.src : '';
  $('#delete-member').hidden = !p; $('#member-error').hidden = true; previewAvatar(); $('#member-dialog').showModal(); $('#member-dialog').scrollTop = 0;
}
$('#members-open').onclick = () => { if (!state) return; $('#members-dialog').showModal(); $('#members-dialog').scrollTop = 0; };
$('#add-member').onclick = () => openMember();
$('#cast').onclick = event => { const button = event.target.closest('[data-person]'); if (button) openMember(button.dataset.person); };
$('#avatar-options').onclick = event => { const button = event.target.closest('[data-avatar]'); if (button) { chosenAvatar = { type:'builtin',id:button.dataset.avatar }; $('#avatar-url').hidden = true; previewAvatar(); } };
$('#use-avatar-url').onclick = () => { $('#avatar-url').hidden = false; $('#avatar-url').focus(); };
$('#avatar-url').onchange = () => { if ($('#avatar-url').value.trim()) { chosenAvatar = { type:'image',src:$('#avatar-url').value.trim() }; previewAvatar(); } };
$('#avatar-file').onchange = () => {
  const file = $('#avatar-file').files[0]; if (!file) return;
  if (!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type)) return toast(tr('photo_error'));
  const reader = new FileReader(); reader.onload = () => { chosenAvatar = { type:'image',src:reader.result }; $('#avatar-url').hidden = true; previewAvatar(); }; reader.readAsDataURL(file);
};
$('#member-form').onsubmit = async event => {
  event.preventDefault(); event.submitter.disabled = true;
  try { await post('members/save',{ id:editingId,name:$('#member-name').value,personality:$('#member-personality').value,label:$('#member-label').value,avatar:chosenAvatar }); $('#member-dialog').close(); }
  catch (error) { $('#member-error').textContent = error.message; $('#member-error').hidden = false; }
  finally { event.submitter.disabled = false; }
};
$('#delete-member').onclick = () => { $('#delete-question').textContent = tr('delete_question',{name:$('#member-name').value}); $('#delete-dialog').showModal(); };
$('#confirm-delete').onclick = async () => { try { await post('members/delete',{ id:editingId }); $('#delete-dialog').close(); $('#member-dialog').close(); } catch (error) { toast(error.message); } };
$('#room-list').onclick = event => {
  const button = event.target.closest('[data-delete-room]'); if (!button) return;
  event.preventDefault(); event.stopPropagation();
  const target = state.rooms.find(r => r.id === button.dataset.deleteRoom);
  if (target) confirmAction('room-delete',target);
};
$('#back-list').onclick = () => location.hash = '';
$('#play').onclick = async () => { const r = room(); if (!r) return; $('#play').disabled = true; try { await post('control',{ roomId:r.id,action:r.status === 'running' ? 'pause' : 'resume' }); if (state.room?.id !== r.id) await loadRoom(r.id); } catch (error) { toast(error.message); } finally { render(); } };
$('#interject-form').onsubmit = async event => { event.preventDefault(); if (!$('#interject').value.trim()) return; $('#send-interject').disabled = true; try { follow = true; await post('interject',{ roomId:selectedId,text:$('#interject').value }); $('#interject').value = ''; if (state.room?.id !== selectedId) await loadRoom(selectedId); } catch (error) { toast(error.message); } finally { $('#send-interject').disabled = false; } };
async function refreshModels(force = false) {
  $('#model-error').hidden = true; $('#refresh-models').disabled = true;
  const selected = $('#setting-model').value || state.settings.model;
  try { models = (await request(`models${force ? '?refresh=1' : ''}`)).models; $('#setting-model').innerHTML = models.map(m => `<option value="${escape(m.id)}">${escape(m.name)}</option>`).join(''); $('#setting-model').value = models.some(m => m.id === selected) ? selected : models[0]?.id; render(); }
  catch (error) { $('#model-error').hidden = false; $('#model-error').textContent = error.message; }
  finally { $('#refresh-models').disabled = false; }
}
function settingsFields() {
  if (!state) return; const s = state.settings;
  languageOptions($('#setting-ui-language'),locale); languageOptions($('#setting-language'),s.language);
  $('#setting-model').innerHTML = `<option value="${escape(s.model)}">${escape(modelName(s.model))}</option>`;
  $('#setting-limit').value = s.maxTurns; $('#setting-pace').value = s.replySeconds; $('#setting-away-time').value = s.awaySeconds;
  $('#setting-away').checked = s.pauseWhenAway; $('#setting-animation').checked = s.animation;
  $('#settings-error').hidden = true;
}
$('#settings-open').onclick = () => { if (!state) return; settingsFields(); $('#settings-dialog').showModal(); $('#settings-dialog').scrollTop = 0; refreshModels(); };
$('#refresh-models').onclick = () => refreshModels(true);
$('#settings-form').onsubmit = async event => {
  event.preventDefault(); event.submitter.disabled = true;
  try { const nextLocale = $('#setting-ui-language').value; await post('settings',{ uiLanguage:nextLocale,theme:state.settings.theme,language:$('#setting-language').value,model:$('#setting-model').value,maxTurns:Number($('#setting-limit').value),replySeconds:Number($('#setting-pace').value),awaySeconds:Number($('#setting-away-time').value),pauseWhenAway:$('#setting-away').checked,animation:$('#setting-animation').checked }); $('#settings-dialog').close(); }
  catch (error) { $('#settings-error').textContent = error.message; $('#settings-error').hidden = false; }
  finally { event.submitter.disabled = false; }
};
function confirmAction(action, target = null) {
  pendingAction = action; deletingRoomId = target?.id || null;
  const key = action === 'reset' ? 'reset_settings' : action === 'room-delete' ? 'delete_room' : 'delete_history';
  $('#action-heading').textContent = tr(key); $('#confirm-action').textContent = tr(key);
  $('#action-question').textContent = tr(action === 'reset' ? 'reset_confirm' : action === 'room-delete' ? 'delete_room_confirm' : 'history_confirm',{topic:target?.topic});
  $('#confirm-action').classList.toggle('danger',action !== 'reset'); $('#action-error').hidden = true;
  $('#action-dialog').showModal(); $('#cancel-action').focus();
}
$('#reset-settings').onclick = () => confirmAction('reset');
$('#delete-history').onclick = () => confirmAction('delete');
$('#action-dialog').addEventListener('cancel',event => { if (actionBusy) event.preventDefault(); });
$('#confirm-action').onclick = async () => {
  if (actionBusy || !pendingAction) return;
  const action = pendingAction, roomId = deletingRoomId; actionBusy = true;
  const buttons = [...$('#action-dialog').querySelectorAll('button')]; buttons.forEach(b => b.disabled = true);
  try {
    await post(action === 'reset' ? 'settings/reset' : action === 'room-delete' ? 'rooms/delete' : 'history/delete',{confirmed:true,...(action === 'room-delete' ? {roomId} : {})});
    $('#action-dialog').close();
    if (action === 'reset') { settingsFields(); theme(state.settings.theme); refreshModels(); }
    else if (action === 'delete') { $('#settings-dialog').close(); location.hash = ''; }
    toast(tr(action === 'reset' ? 'settings_reset' : action === 'room-delete' ? 'room_deleted' : 'history_deleted'));
  } catch (error) { $('#action-error').textContent = error.message; $('#action-error').hidden = false; }
  finally { actionBusy = false; buttons.forEach(b => b.disabled = false); }
};
for (const button of document.querySelectorAll('[data-close]')) button.onclick = () => button.closest('dialog').close();
for (const dialog of document.querySelectorAll('dialog:not(#locale-dialog)')) {
  dialog.addEventListener('click',event => { if (event.target !== dialog || (dialog.id === 'action-dialog' && actionBusy)) return; const b = dialog.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close(); });
  dialog.addEventListener('close',() => { if (dialog.id === 'settings-dialog' && state) theme(state.settings.theme); });
}
window.addEventListener('scroll',() => { follow = document.documentElement.scrollHeight-window.innerHeight-window.scrollY < 160; if (follow) $('#jump-live').hidden = true; },{ passive:true });
$('#jump-live').onclick = () => { follow = true; $('#jump-live').hidden = true; window.scrollTo({ top:document.documentElement.scrollHeight,behavior:'smooth' }); };
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',() => theme(state?.settings.theme || document.documentElement.dataset.theme || 'system'));
window.addEventListener('hashchange',route); document.addEventListener('visibilitychange',watch);
route();

function applyLocale(next) {
  if (!LOCALES.includes(next)) return;
  locale = next; document.documentElement.lang = next; document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  if ($('#locale-dialog').open) $('#locale-dialog').close();
  for (const node of document.querySelectorAll('[data-i18n]')) node.textContent = tr(node.dataset.i18n);
  for (const node of document.querySelectorAll('[data-i18n-aria]')) node.setAttribute('aria-label',tr(node.dataset.i18nAria));
  for (const node of document.querySelectorAll('[data-i18n-placeholder]')) node.setAttribute('placeholder',tr(node.dataset.i18nPlaceholder));
  $('#connection').textContent = tr(connectionStatus); $('.app-shell').hidden = false;
  memberFingerprint = ''; renderedRoom = null; renderedIds.clear();
  if (state) { languageOptions($('#setting-language'),state.settings.language); languageOptions($('#setting-ui-language'),locale); }
  watch(); render();
}
function updateLanguageChoice() {
  $('#locale-heading').textContent = t(localeChoice,'choose_language');
  $('#locale-continue').textContent = t(localeChoice,'continue');
  for (const button of $('#locale-choices').querySelectorAll('button')) button.setAttribute('aria-pressed',String(button.dataset.locale === localeChoice));
}
function initializeLocale() {
  if ($('#locale-dialog').open) return;
  $('#locale-choices').innerHTML = LOCALES.map((code,i) => `<button type="button" class="language-choice" data-locale="${code}" lang="${code}">${NATIVE_LANGUAGES[i]}</button>`).join('');
  $('#locale-choices').onclick = event => { const button = event.target.closest('[data-locale]'); if (!button) return; localeChoice = button.dataset.locale; updateLanguageChoice(); };
  $('#locale-dialog').addEventListener('cancel',event => event.preventDefault());
  updateLanguageChoice(); $('#locale-dialog').showModal();
}
$('#locale-continue').onclick = async () => {
  $('#locale-continue').disabled = true; $('#locale-error').hidden = true;
  try { state = await request('locale',{locale:localeChoice,defaultConversation:true}); render(); }
  catch (error) { $('#locale-error').textContent = t(localeChoice,'error_connection'); $('#locale-error').hidden = false; }
  finally { $('#locale-continue').disabled = false; }
};
for (const form of document.querySelectorAll('form')) {
  form.addEventListener('invalid',event => event.target.setCustomValidity(tr('error_input')),true);
  form.addEventListener('input',event => event.target.setCustomValidity?.(''));
}
