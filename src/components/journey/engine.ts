/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck -- ported plain-JS three.js scene
/* In-Sync build journey: the 3D build that plays in the home page hero.
   Ported from insync-journey.html (2026-11-13). The 3D scene below boot() is kept as designed;
   the page-level parts were changed to live inside a web page:
   - the opening screen is rendered by React (JourneyHero) so the heading is in the pre-rendered HTML;
   - keys work only while the hero is on screen, the mouse wheel scrolls the page, rendering pauses off screen;
   - phones held upright get the same stages as cards, without 3D;
   - the products pop-up links to each product page, or offers a demo where there is no page. */
import { JOURNEY_DATA, WORLD_DOTS } from './journeyData';

export interface JourneyOptions {
  cards: boolean;
  onIntro: (show: boolean) => void;
  onOpenPage: (href: string) => void;
  onRequestDemo: () => void;
}
export interface JourneyHandle { start: () => void; destroy: () => void; }

export function mountJourney(app: HTMLElement, opts: JourneyOptions): JourneyHandle {
const D = JOURNEY_DATA;
const DOTS = WORLD_DOTS.trim().split(' ').map(s => s.split(',').map(Number));
const G = Object.fromEntries(D.groups.map(g => [g.id, g]));
const ST = Object.fromEntries(D.stages.map(s => [s.id, s]));
const ICONS = {"LinkedIn outreach": "person_add", "Referrals": "group_add", "Google & Meta ads": "campaign", "Events": "event", "Social posting": "share", "Websites & forms": "language", "AI calling": "call", "WhatsApp": "chat", "Email & SMS": "mail", "Voice assistant": "mic", "Chatbots": "smart_toy", "Support desk": "confirmation_number", "Post-sales service": "support_agent", "Any-format upload": "upload_file", "Projects": "account_tree", "AI document reading": "document_scanner", "Field sales": "location_on", "Pipelines & tasks": "checklist", "Approvals": "approval", "Role tests": "quiz", "AI interviews": "record_voice_over", "Attendance & leave": "event_available", "KPIs & payroll": "payments", "Onboarding": "badge", "Coaching & training": "school", "Quote to invoice": "receipt_long", "Expenses": "receipt", "Purchase to pay": "shopping_cart", "Accounting": "calculate", "Payments & wallets": "account_balance_wallet", "Lending": "savings", "KYC checks": "verified_user", "Face match": "face", "Credit reports": "credit_score", "Blockchain audit": "link", "Dashboards": "dashboard", "Fraud checks": "policy", "Regulator report": "description"};
const LAYER_ICONS = {"services": "cloud", "data": "database", "logic": "settings", "apis": "api", "screens": "devices", "core": "memory"};
const INK = { win: true, serve: true, run: true, people: true, money: true, check: true };
const CARDS = opts.cards;
const COARSE = matchMedia('(pointer: coarse)').matches;

let DEAD = false, VISIBLE = true, RAF = 0;
const cleanups = [];
const listen = (target, ev, fn, o) => { target.addEventListener(ev, fn, o); cleanups.push(() => target.removeEventListener(ev, fn, o)); };

function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'on') for (const [ev, fn] of Object.entries(v)) e.addEventListener(ev, fn);
    else if (k === 'style' && typeof v === 'object') for (const [sk, sv] of Object.entries(v)) e.style.setProperty(sk, sv);
    else if (k === 'class') e.className = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat(Infinity)) if (k != null && k !== false) e.append(k.nodeType ? k : document.createTextNode(String(k)));
  return e;
}
const owned = [];   // every node this module adds to the hero, removed on destroy
const add = (...els) => { for (const el of els) { app.append(el); owned.push(el); } };

/* ---------- the journey ---------- */
const DAYS = [['pre', 'Before sign-off'], ['d0', 'Day 0'], ['d1', 'Day 1'], ['d2', 'Day 2'], ['d3', 'Day 3'], ['d4', 'Day 4'], ['d5', 'Day 5'], ['d6', 'Day 6'], ['d7', 'Day 7'], ['post', 'After go-live']];
const STEPS = [
  { id: 'architecture', x: 0, days: [], eyebrow: 'Before the build', title: 'High-level architecture', lead: ['Six layers. Security added at each one.'] },
  { id: 'platform', x: 0, days: [], eyebrow: 'Before the build', title: 'The capability library', lead: ['37 blocks, already built and running.'] },
  { id: 'requirements', x: 0, days: ['pre'], stage: 'requirements', title: 'Requirements', lead: ['Each need maps to a ready block. Gaps are built new.'] },
  { id: 'commercials', x: 20, days: ['pre', 'd0'], stage: 'commercials', title: 'Sign-off', lead: ['SOW, MSA, SLA, DPA signed. The clock starts.'] },
  { id: 'build', x: 40, days: ['d1', 'd2'], stage: 'build', title: 'Build', lead: ['Blocks stitched floor by floor. No sprints.'] },
  { id: 'testing', x: 60, days: ['d1', 'd2'], stage: 'testing', title: 'Testing', lead: ['SIT, UAT, security. Every floor must pass.'] },
  { id: 'deployment', x: 80, days: ['d3'], stage: 'deployment', title: 'Live', lead: ['Client’s region, client’s key. Live on Day 3.'] },
  { id: 'training', x: 100, days: ['d4', 'd5'], stage: 'training', title: 'Training', lead: ['Each team trained on its own screens.'] },
  { id: 'documentation', x: 120, days: ['d6', 'd7'], stage: 'documentation', title: 'Documentation', lead: ['Everything documented by Day 7.'] },
  { id: 'after', x: 140, days: ['post'], stage: 'after', title: 'After go-live', lead: ['Requested, approved, built. Same day.'] },
  { id: 'summary', x: 140, days: [], eyebrow: 'Built with AI, without compromise', title: 'What this proves', lead: [] },
];
const ROLES = { requirements: ['Workshop, BRD, sign-off', 'Research, prototype'], commercials: ['Agrees the contracts', ''], build: ['Approves the design', 'Writes the code'], testing: ['Runs UAT, signs off', 'Tests at scale'], deployment: ['Plans the cutover', 'Deploys, sets keys'], training: ['Trains each team', ''], documentation: ['Reviews and approves', 'Drafts every document'], after: ['Approves the change', 'Builds and releases'] };
const PROOFS = [['SPEED', 'Live on Day 3. Typical build: 3–6 months.', 'p1'], ['PRECISION', 'Signed-off scope. Every floor tested.', 'p2'], ['ZERO BUILD COST', 'Build and upgrades free. Pay only for maintenance.', 'p3']];
let K = 0, enteredAt = performance.now() / 1000;
function go(k) { k = Math.max(0, Math.min(STEPS.length - 1, k)); if (k === K) return; const back = k < K; K = k; enteredAt = performance.now() / 1000 - (back ? 60 : 0); autoAt = performance.now() / 1000; renderUI(); SCENE?.onStep(back); }

/* ---------- UI ---------- */
const caption = h('section', { class: 'caption', 'aria-live': 'polite' });
const days = h('div', { class: 'days', 'aria-label': 'Timeline' });
const count = h('span', { class: 'count' });
const prevB = h('button', { class: 'btn', type: 'button', 'aria-label': 'Previous stage', on: { click: () => { if (K === 0) showIntro(); else go(K - 1); } } }, '‹');
const nextB = h('button', { class: 'btn primary', type: 'button', 'aria-label': 'Next stage', on: { click: () => go(K + 1) } }, '›');
/* autoplay: each stage holds for its animation plus ~3 s of reading, then moves on; any click or key takes over */
const DWELL = CARDS ? [6, 6, 7, 6, 6, 6, 6, 6, 6, 7, 0] : [9, 7, 11, 7.5, 8.5, 8.5, 7.5, 7.5, 9, 10.5, 0];
let AUTO = false, autoAt = 0;
const PLAY_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>';
const PAUSE_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="6.5" y="5.5" width="4" height="13" rx="1" fill="currentColor"/><rect x="13.5" y="5.5" width="4" height="13" rx="1" fill="currentColor"/></svg>';
const playB = h('button', { class: 'btn play', type: 'button', on: { click: () => AUTO ? pauseAuto() : resumeAuto() } });
const autoFill = h('i'); const autoBar = h('div', { class: 'autobar' }, autoFill);
function syncPlay() { playB.innerHTML = AUTO ? PAUSE_SVG : PLAY_SVG; playB.setAttribute('aria-label', AUTO ? 'Pause' : 'Play'); autoBar.style.visibility = AUTO ? 'visible' : 'hidden'; }
function pauseAuto() { if (!AUTO) return; AUTO = false; syncPlay(); }
function resumeAuto() { const now = performance.now() / 1000; if (K === STEPS.length - 1) { go(0); } AUTO = true; autoAt = Math.max(enteredAt, now - Math.max(0, DWELL[K] - 2.5)); syncPlay(); }
let lastMove = 0; listen(window, 'pointermove', () => { lastMove = performance.now() / 1000; }, { passive: true });
const ticker = setInterval(() => {
  app.classList.toggle('quiet', !CARDS && AUTO && !INTRO && !overlayEl && performance.now() / 1000 - lastMove > 2.5);
  const now = performance.now() / 1000; const d = DWELL[K] || 1; const p = Math.min(1, (now - autoAt) / d); autoFill.style.width = (p * 100).toFixed(1) + '%';
  if (!AUTO || INTRO || overlayEl || document.hidden || !VISIBLE || demoOpen()) { if (AUTO && (overlayEl || document.hidden || !VISIBLE || demoOpen())) autoAt += .25; return; }
  if (K >= STEPS.length - 1) { AUTO = false; syncPlay(); return; }
  if (p >= 1) go(K + 1);
}, 250);
cleanups.push(() => clearInterval(ticker));
const demoOpen = () => !!document.querySelector('[role="dialog"][data-state="open"]');
const nav = h('div', { class: 'nav' }, playB, prevB, count, nextB, autoBar);
syncPlay();
const hint = h('div', { class: 'hint' }, 'Plays on its own · click or use ← → to take over');
const prodBtn = h('button', { class: 'btn', type: 'button', on: { click: openProducts } }, 'Ready-made products');
const top = h('div', { class: 'top' }, prodBtn);
let INTRO = true;
function startJourney() { if (DEAD) return; INTRO = false; opts.onIntro(false); app.classList.add('playing'); K = 0; enteredAt = autoAt = performance.now() / 1000; AUTO = true; syncPlay(); renderUI(); SCENE?.onStep(); }
function showIntro() { INTRO = true; AUTO = false; syncPlay(); app.classList.remove('playing'); opts.onIntro(true); }
if (CARDS) app.classList.add('cards');
add(top, caption, days, nav, hint);

const io = new IntersectionObserver(([e]) => { VISIBLE = e.isIntersecting; }, { threshold: 0.2 });
io.observe(app); cleanups.push(() => io.disconnect());

function renderUI() {
  const s = STEPS[K]; const st = s.stage ? ST[s.stage] : null;
  const dayTxt = s.days.length ? DAYS.filter(d => s.days.includes(d[0])).map(d => d[1]).join(' – ').replace('Day 1 – Day 2', 'Days 1–2').replace('Day 4 – Day 5', 'Days 4–5').replace('Day 6 – Day 7', 'Days 6–7').replace('Before sign-off – Day 0', 'Day 0') : '';
  caption.replaceChildren(...[
    h('div', { class: 'eyebrow' }, s.eyebrow || `Stage ${K - 1} of 8${dayTxt ? ' · ' + dayTxt : ''}`),
    h('h2', {}, s.title), s.lead.length ? h('p', { class: 'lead' }, s.lead) : null,
    st ? h('div', { class: 'roles' }, h('div', { class: 'role' }, h('span', { class: 'tag' }, 'Expert'), h('span', {}, ROLES[s.stage][0])), ROLES[s.stage][1] ? h('div', { class: 'role ai' }, h('span', { class: 'tag' }, 'AI'), h('span', {}, ROLES[s.stage][1])) : null) : null,
    CARDS && st ? h('div', { class: 'terms' }, st.terms.map(t => h('span', {}, t[0]))) : null,
    s.id === 'summary' ? h('div', { class: 'proofs' }, PROOFS.map(([a, b, c]) => h('div', { class: c }, h('b', {}, a), h('span', {}, b)))) : null].filter(Boolean));
  const idx = s.days.map(d => DAYS.findIndex(x => x[0] === d)); const maxIdx = Math.max(-1, ...idx);
  days.replaceChildren(...DAYS.map(([id, label], i) => h('div', { class: (s.days.includes(id) ? 'on' : i < maxIdx || (s.id === 'summary') ? 'past' : '') + (id === 'pre' || id === 'post' ? ' wide' : '') }, label)));
  count.textContent = `${K} / ${STEPS.length - 1}`;
  prevB.disabled = false; nextB.disabled = K === STEPS.length - 1;
  if (CARDS) { const on = days.querySelector('.on'); if (on) days.scrollLeft = on.offsetLeft - days.clientWidth / 2 + on.offsetWidth / 2; }
}
/* keys move the build only while the hero is on screen; space, Enter and Page keys only when focus is inside the hero, so the page still scrolls */
listen(window, 'keydown', e => {
  if (overlayEl) { if (e.key === 'Escape') closeProducts(); return; }
  if (INTRO || !VISIBLE || demoOpen() || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
  const inside = app.contains(document.activeElement);
  const fwd = ['ArrowRight'].concat(inside ? ['PageDown'] : []), back = ['ArrowLeft'].concat(inside ? ['PageUp'] : []);
  if (e.key === 'p' || e.key === 'P') { if (AUTO) pauseAuto(); else resumeAuto(); return; }
  if (fwd.includes(e.key)) { e.preventDefault(); pauseAuto(); go(K + 1); }
  else if (back.includes(e.key)) { e.preventDefault(); pauseAuto(); if (K === 0) showIntro(); else go(K - 1); }
});
let swipe = null;
listen(app, 'pointerdown', e => { if (!INTRO && !e.target.closest?.('.play, .intro')) pauseAuto(); }, true);
listen(app, 'touchstart', e => { if (e.touches.length === 1) swipe = [e.touches[0].clientX, e.touches[0].clientY, performance.now()]; }, { passive: true });
listen(app, 'touchend', e => { if (!swipe || INTRO || overlayEl) { swipe = null; return; } const t = e.changedTouches[0]; const dx = t.clientX - swipe[0], dy = t.clientY - swipe[1]; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && performance.now() - swipe[2] < 600) { if (dx > 0 && K === 0) showIntro(); else go(K + (dx < 0 ? 1 : -1)); } swipe = null; }, { passive: true });

/* ---------- ready-made products ---------- */
let overlayEl = null;
function openProducts() { pauseAuto(); overlayEl = h('div', { class: 'overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Ready-made products', on: { click: e => { if (e.target === overlayEl) closeProducts(); } } }); add(overlayEl); renderProducts(); overlayEl.querySelector('.pnode.on')?.focus(); }
function closeProducts() { overlayEl?.remove(); overlayEl = null; prodBtn.focus({ preventScroll: true }); }
let OPEN = 'crm';
const SECURITY = ['Your AWS region', 'Your own key', 'DPDP Act 2023', 'Role-based access', 'Safe sign-in', 'Blockchain record'];
function renderProducts() {
  if (!overlayEl) return; const list = D.ready; const divName = Object.fromEntries(D.divisions);
  const core = list.filter(p => p.tier === 'core'), sup = list.filter(p => p.tier === 'support');
  const VW = 1000, VH = 860, cx = VW / 2, cy = VH / 2;
  const rows = Math.ceil(core.length / 3), RH = 88;
  const pos = {}; core.forEach((p, i) => { const r = Math.floor(i / 3), c = i % 3, inRow = Math.min(3, core.length - r * 3); pos[p.id] = [cx + (c - (inRow - 1) / 2) * 200, cy + (r - (rows - 1) / 2) * RH]; });
  sup.forEach((p, i) => { const a = -Math.PI / 2 + Math.PI / 6 + i * 2 * Math.PI / sup.length; pos[p.id] = [cx + Math.cos(a) * 418, cy + Math.sin(a) * 325]; });
  const ns = 'http://www.w3.org/2000/svg'; const S = (t, a) => { const e = document.createElementNS(ns, t); for (const [k, v] of Object.entries(a)) e.setAttribute(k, v); return e; };
  const svg = S('svg', { viewBox: `0 0 ${VW} ${VH}`, class: 'orbit-svg', 'aria-hidden': 'true' });
  const coreH = rows * RH + 40;
  svg.append(S('ellipse', { cx, cy, rx: 478, ry: 410, class: 'ring sec' }), S('ellipse', { cx, cy, rx: 440, ry: 372, class: 'ring sec2' }), S('ellipse', { cx, cy, rx: 418, ry: 325, class: 'ring sup' }), S('rect', { x: cx - 310, y: cy - coreH / 2, width: 620, height: coreH, rx: Math.min(108, coreH / 2), class: 'ring core' }));
  sup.forEach(p => p.feeds.forEach(id => { if (!pos[id]) return; const [x1, y1] = pos[p.id], [x2, y2] = pos[id];
    svg.append(S('path', { d: `M${x1},${y1} Q${(x1 + x2) / 2 + (cy - (y1 + y2) / 2) * .15},${(y1 + y2) / 2 + ((x1 + x2) / 2 - cx) * .15} ${x2},${y2}`, class: 'feed', 'data-a': p.id, 'data-b': id })); }));
  const focusOn = id => { const fp = list.find(x => x.id === id); overlayEl.querySelectorAll('.pnode').forEach(el => { const q = list.find(x => x.id === el.dataset.id); const rel = fp && (fp.id === q.id || (fp.feeds || []).includes(q.id) || (q.feeds || []).includes(fp.id)); el.classList.toggle('dim', !!fp && !rel); }); svg.querySelectorAll('.feed').forEach(pe => pe.classList.toggle('on', pe.dataset.a === id || pe.dataset.b === id)); };
  const node = p => { const [x, y] = pos[p.id]; const on = OPEN === p.id;
    return h('button', { class: 'pnode ' + p.tier + (on ? ' on' : ''), type: 'button', 'aria-pressed': on ? 'true' : 'false', 'data-id': p.id, style: { left: (x / VW * 100) + '%', top: (y / VH * 100) + '%' },
      on: { click: () => { OPEN = p.id; renderProducts(); overlayEl?.querySelector(`.pnode[data-id="${p.id}"]`)?.focus(); }, mouseenter: () => focusOn(p.id), mouseleave: () => focusOn(OPEN), focus: () => focusOn(p.id), blur: () => focusOn(OPEN) } },
      h('b', {}, p.name), h('small', {}, divName[p.div] || '')); };
  const secL = SECURITY.map((t, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / SECURITY.length; return h('span', { class: 'seclbl', style: { left: ((cx + Math.cos(a) * 478) / VW * 100) + '%', top: ((cy + Math.sin(a) * 410) / VH * 100) + '%' } }, '✓ ' + t); });
  const p = list.find(x => x.id === OPEN) || list[0]; const feats = (p.features || []).filter(Boolean);
  const fedBy = sup.filter(s => s.feeds.includes(p.id)).map(s => s.name), feeds = (p.feeds || []).map(id => list.find(x => x.id === id)?.name).filter(Boolean);
  const action = p.href
    ? h('a', { class: 'btn primary go', href: p.href, on: { click: e => { if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); closeProducts(); opts.onOpenPage(p.href); } } }, `Open the ${p.name} page →`)
    : h('button', { class: 'btn warm go', type: 'button', on: { click: () => { closeProducts(); opts.onRequestDemo(); } } }, 'Request a demo');
  const detail = h('aside', { class: 'pdetail', 'aria-live': 'polite' },
    h('div', { class: 'eyebrow' }, (p.tier === 'core' ? 'Core product' : 'Support product') + ' · ' + (divName[p.div] || '')), h('h3', {}, p.name), h('p', { class: 'line' }, p.line),
    feeds.length ? h('p', { class: 'rel' }, 'Feeds: ', h('b', {}, feeds.join(', '))) : null, fedBy.length ? h('p', { class: 'rel' }, 'Fed by: ', h('b', {}, fedBy.join(', '))) : null,
    p.metricValue ? h('div', { class: 'm' }, h('b', {}, p.metricValue), h('span', {}, p.metricLabel)) : null,
    p.caseLine ? h('p', { class: 'case' }, p.caseLine) : null,
    feats.length ? [h('div', { class: 'label' }, 'Key features'), h('ol', { class: 'feats' }, feats.map(f => h('li', {}, f)))] : null,
    action);
  overlayEl.replaceChildren(h('div', { class: 'sheet' },
    h('div', { class: 'sheet-head' }, h('div', {}, h('div', { class: 'eyebrow' }, 'Already available'), h('h2', {}, 'Ready-made products'), h('p', {}, 'Core products at the centre. Support products around them feed into the core. Security and privacy apply to every product. Pick a product to see what it does.')),
      h('div', { style: { display: 'flex', gap: '8px', 'flex-wrap': 'wrap' } },
        h('button', { class: 'btn primary', type: 'button', on: { click: closeProducts } }, 'Back to the build'))),
    h('div', { class: 'legend' }, h('span', { class: 'lg core' }, 'Core products'), h('span', { class: 'lg sup' }, 'Support products'), h('span', { class: 'lg sec' }, 'Security and privacy')),
    h('div', { class: 'pwrap' }, h('div', { class: 'orbit' }, svg, secL, list.map(node)), detail)));
  focusOn(OPEN);
}

renderUI();
let SCENE = null;
if (!CARDS) boot().then(s => { if (DEAD) { s.dispose(); return; } SCENE = s; }).catch(err => { console.error(err); caption.append(h('p', { class: 'lead', style: { color: 'var(--warm)' } }, 'The 3D view could not start on this device. Use the arrows to read through the stages.')); });

return {
  start: startJourney,
  destroy() { DEAD = true; cleanups.forEach(f => f()); SCENE?.dispose(); owned.forEach(el => el.remove()); app.classList.remove('cards', 'playing', 'quiet'); },
};

/* ---------- 3D ---------- */
async function boot() {
  const THREE = await import('three');
  const { RoundedBoxGeometry: RB } = await import('three/addons/geometries/RoundedBoxGeometry.js');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
  const { CSS2DRenderer, CSS2DObject } = await import('three/addons/renderers/CSS2DRenderer.js');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
  const { EffectComposer } = await import('three/addons/postprocessing/EffectComposer.js');
  const { RenderPass } = await import('three/addons/postprocessing/RenderPass.js');
  const { UnrealBloomPass } = await import('three/addons/postprocessing/UnrealBloomPass.js');
  const { OutputPass } = await import('three/addons/postprocessing/OutputPass.js');
  // the icon and text fonts are drawn into the 3D labels, so wait until their stylesheets have registered them (max 5 s)
  await new Promise(r => { const t0 = performance.now(); const fams = () => [...document.fonts].map(f => f.family).join('|'); const tick = () => (/Material Symbols/.test(fams()) && /Space Grotesk/.test(fams())) || performance.now() - t0 > 5000 ? r(null) : setTimeout(tick, 50); tick(); });
  let msFaces = [];
  await Promise.race([Promise.all(['600 40px "Space Grotesk"', '700 40px "Space Grotesk"', '400 20px Inter', '600 20px Inter'].map(f => document.fonts.load(f)).concat([document.fonts.load('64px "Material Symbols Rounded"', 'chat').then(f => { msFaces = f; })])), new Promise(r => setTimeout(r, 4000))]);
  const HAS_MS = msFaces.length > 0;
  const glyph = (g, name, x, y, size, color) => { if (!HAS_MS || !name) return; g.save(); g.font = `${size}px "Material Symbols Rounded"`; g.fillStyle = color; g.textBaseline = 'middle'; g.textAlign = 'center'; g.fillText(name, x, y); g.restore(); };
  const V3 = THREE.Vector3; const BG = '#060C1A';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LITE = matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 820;
  const clamp01 = x => Math.max(0, Math.min(1, x));
  const seg = (t, a, b) => clamp01((t - a) / (b - a));

  const renderer = new THREE.WebGLRenderer({ antialias: !LITE, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(LITE ? 1.5 : 2, devicePixelRatio)); renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !LITE; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  app.prepend(renderer.domElement); owned.push(renderer.domElement);
  const lr = new CSS2DRenderer(); lr.domElement.className = 'labels'; app.insertBefore(lr.domElement, top); owned.push(lr.domElement);
  const tip = h('div', { class: 'tip', hidden: true }); add(tip);

  const scene = new THREE.Scene();
  const bgc = document.createElement('canvas'); bgc.width = bgc.height = 512; { const g = bgc.getContext('2d'); const gr = g.createRadialGradient(256, 190, 0, 256, 220, 380); gr.addColorStop(0, '#18295a'); gr.addColorStop(.55, '#0b1631'); gr.addColorStop(1, BG); g.fillStyle = gr; g.fillRect(0, 0, 512, 512); }
  const bgt = new THREE.CanvasTexture(bgc); bgt.colorSpace = THREE.SRGBColorSpace; scene.background = bgt;
  scene.fog = new THREE.Fog(BG, 70, 210);
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = .45;
  const camera = new THREE.PerspectiveCamera(36, 1, .5, 400);
  scene.add(new THREE.HemisphereLight('#A9C1FF', '#0A1020', .6));
  const key = new THREE.DirectionalLight('#FFF6EA', 2.3); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, near: 1, far: 70 }); key.shadow.bias = -.0004; key.shadow.normalBias = .03; scene.add(key, key.target);
  const rim = new THREE.DirectionalLight('#5FD3DC', 1.5); scene.add(rim, rim.target);
  { const fl = new THREE.DirectionalLight('#7C8CFF', .45); fl.position.set(80, 6, 30); scene.add(fl); }

  const camXZ = new THREE.Vector2();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uC: { value: camXZ } },
    vertexShader: 'varying vec3 vW; void main(){ vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: 'uniform vec2 uC; varying vec3 vW; float line(float x,float w){ float d=abs(fract(x-.5)-.5)/fwidth(x); return 1.-min(d/w,1.);} void main(){ vec2 p=vW.xz; float g1=max(line(p.x,1.),line(p.y,1.))*.09; float g5=max(line(p.x/5.,1.2),line(p.y/5.,1.2))*.2; float f=1.-smoothstep(25.,95.,length(p-uC)); gl_FragColor=vec4(vec3(.035,.07,.15)+vec3(.08,.64,.68)*(g1+g5),f*.95); }' }));
  ground.rotation.x = -Math.PI / 2; ground.position.x = 70; scene.add(ground);
  const shadowFloor = new THREE.Mesh(new THREE.PlaneGeometry(220, 40), new THREE.ShadowMaterial({ opacity: .5, color: '#000208' })); shadowFloor.rotation.x = -Math.PI / 2; shadowFloor.position.set(70, .003, 0); shadowFloor.receiveShadow = true; scene.add(shadowFloor);

  const glow = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.25, 'rgba(160,240,245,.6)'); gr.addColorStop(1, 'rgba(20,163,174,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const spriteM = (color, op = 1) => new THREE.SpriteMaterial({ map: glow, color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const tex = (w, hh, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = hh; draw(c.getContext('2d'), w, hh); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
  const L2 = (el, parent, pos) => { const o = new CSS2DObject(el); if (pos) o.position.copy(pos); parent.add(o); o.userData.op = 0; el.style.opacity = '0'; return o; };
  const lbl = (cls, ...kids) => h('div', { class: 'l3 ' + cls }, ...kids);
  const setL = (o, v) => { v = clamp01(v); if (Math.abs(o.userData.op - v) < .004) return; o.userData.op = v; o.element.style.opacity = v.toFixed(3); o.element.style.visibility = v > .01 ? 'visible' : 'hidden'; };
  const fadeLine = (mat, v) => { mat.opacity += (v - mat.opacity) * .12; };

  /* track and station markers */
  const rails = new THREE.Group(); scene.add(rails);
  for (const z of [-1.75, 1.75]) { const r = new THREE.Mesh(new THREE.BoxGeometry(168, .05, .08), new THREE.MeshBasicMaterial({ color: '#2a6f86', toneMapped: false })); r.position.set(70, .03, z); rails.add(r); }
  const STATIONS = [['00', 'Architecture · Library', 0], ['01–02', 'Requirements · Commercials', 10], ['03', 'Build', 40], ['04', 'Testing', 60], ['05', 'Deployment', 80], ['06', 'Training', 100], ['07', 'Documentation', 120], ['08', 'After go-live', 140]];
  const staL = STATIONS.map(([n, name, x]) => { const pad = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .04, 32), new THREE.MeshBasicMaterial({ color: '#2BB6C0', toneMapped: false })); pad.position.set(x, .03, 3.4); scene.add(pad); return L2(lbl('sta', n + '  ' + name), scene, new V3(x, .3, 3.4)); });

  /* the rig: cart + platform foundation, travels along the line */
  const rig = new THREE.Group(); scene.add(rig);
  const cart = new THREE.Mesh(new RB(8.4, .3, 3.3, 3, .08), new THREE.MeshStandardMaterial({ color: '#0d1a36', roughness: .5, metalness: .4, emissive: '#14A3AE', emissiveIntensity: .15 })); cart.position.y = .15; cart.receiveShadow = true; rig.add(cart);
  const LC = { services: '#0E2140', data: '#112A52', logic: '#143263', apis: '#173B74', screens: '#1A4484', core: '#0A4F57' };
  const FW = 7.6, FD = 2.7, FH = .42, FG = .04, F0 = .3;
  const slabs = D.layers.map((l, i) => {
    const m = new THREE.Mesh(new RB(FW, FH, FD, 4, .06), new THREE.MeshPhysicalMaterial({ color: LC[l.id], roughness: .55, metalness: .1, clearcoat: .15, emissive: '#14A3AE', emissiveIntensity: l.id === 'core' ? .08 : 0 }));
    m.castShadow = m.receiveShadow = true; const y = F0 + FH / 2 + i * (FH + FG); m.position.y = y;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(FW - .2, FH - .05), new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false, color: 0xE0E0E0, map: tex(1520, 82, (g, w, hh) => { g.fillStyle = '#fff'; glyph(g, LAYER_ICONS[l.id], 70, hh / 2 + 2, 66, '#fff'); g.font = '700 60px "Space Grotesk"'; g.textBaseline = 'middle'; g.fillText(l.name.toUpperCase(), 130, hh / 2 + 3); }) }));
    face.position.z = FD / 2 + .004; m.add(face); m.userData = { tip: [l.name, l.what] }; rig.add(m); return { l, m, y };
  });
  const SEC_SHORT = { services: '', data: 'Your region · your key', logic: 'Role-based access', apis: 'Safe sign-in', screens: 'Consent · masking', core: 'Blockchain record · daily checks' };
  slabs.forEach(sl => {
    sl.right = L2(lbl('', h('div', { style: { transform: 'translateX(50%)' } }, h('span', { class: 'chip3 ok' }, '✓ ' + SEC_SHORT[sl.l.id]))), rig, new V3(FW / 2 + .35, sl.y, 0)); sl.right.userData.has = sl.l.sec.length > 0;
  });
  const secTitle = L2(lbl('big3', 'Security added at each layer'), rig, new V3(FW / 2 + 2.4, 6, 0));
  /* architecture symbols: one conventional symbol per layer */
  const symMat = (c, e = 0) => new THREE.MeshPhysicalMaterial({ color: c, roughness: .35, metalness: .15, clearcoat: .6, emissive: c, emissiveIntensity: e });
  const glyphPlane = (name, w, color, bg) => new THREE.Mesh(new THREE.PlaneGeometry(w, w), new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false, depthWrite: false, map: tex(256, 256, (g) => { if (bg) { g.fillStyle = bg; g.fillRect(0, 0, 256, 256); } glyph(g, name, 128, 132, 210, color); }) }));
  function makeSym(id) {
    const g = new THREE.Group();
    if (id === 'services') { const m = symMat('#5F93C8', .02); [[0, .08, .62], [-.62, -.12, .45], [.62, -.1, .48], [-.3, .3, .44], [.32, .28, .46], [0, -.2, .5]].forEach(([x, y, r]) => { const b = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 18), m); b.position.set(x, y, 0); b.scale.z = .55; b.castShadow = true; g.add(b); }); }
    if (id === 'data') { const m = symMat('#4C8DDB', .1); for (let i = 0; i < 3; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(.72, .72, .3, 48), m); c.position.y = -.36 + i * .36; c.castShadow = true; g.add(c); const r = new THREE.Mesh(new THREE.TorusGeometry(.72, .022, 8, 64), new THREE.MeshBasicMaterial({ color: '#D6EBFF', toneMapped: false })); r.rotation.x = Math.PI / 2; r.position.y = -.36 + i * .36 + .15; g.add(r); } }
    if (id === 'logic') { const sh = new THREE.Shape(); const T = 10, R1 = .72, R0 = .56; for (let i = 0; i < T * 2; i++) { const a0 = i / (T * 2) * Math.PI * 2, a1 = (i + 1) / (T * 2) * Math.PI * 2, r = i % 2 ? R0 : R1; const p0 = [Math.cos(a0 + .04) * r, Math.sin(a0 + .04) * r], p1 = [Math.cos(a1 - .04) * r, Math.sin(a1 - .04) * r]; if (i === 0) sh.moveTo(...p0); else sh.lineTo(...p0); sh.lineTo(...p1); } const hole = new THREE.Path(); hole.absarc(0, 0, .22, 0, Math.PI * 2, true); sh.holes.push(hole);
      const geo = new THREE.ExtrudeGeometry(sh, { depth: .26, bevelEnabled: true, bevelThickness: .03, bevelSize: .03, bevelSegments: 2 }); geo.center(); const gm = new THREE.Mesh(geo, symMat('#7C9CC8', .08)); gm.castShadow = true; gm.userData.spin = 1; g.add(gm);
      const g2 = new THREE.Mesh(geo, symMat('#5C7FAF', .05)); g2.scale.setScalar(.55); g2.position.set(.82, .46, -.05); g2.userData.spin = -1.8; g.add(g2); }
    if (id === 'apis') { const hx = new THREE.Mesh(new THREE.CylinderGeometry(.74, .74, .26, 6), symMat('#2BB6C0', .12)); hx.rotation.x = Math.PI / 2; hx.rotation.y = Math.PI / 6; hx.castShadow = true; g.add(hx); const gp = glyphPlane('api', 1.05, '#0B1530'); gp.position.z = .14; g.add(gp); }
    if (id === 'screens') { const frame = symMat('#1B2A44'); const mon = new THREE.Mesh(new RB(1.5, .95, .08, 3, .03), frame); mon.position.set(-.3, .12, 0); mon.castShadow = true; g.add(mon);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.38, .83), new THREE.MeshBasicMaterial({ color: '#5FA8E8', toneMapped: false })); scr.position.set(-.3, .12, .045); g.add(scr);
      const stand = new THREE.Mesh(new THREE.BoxGeometry(.1, .3, .08), frame); stand.position.set(-.3, -.5, 0); g.add(stand); const base = new THREE.Mesh(new THREE.BoxGeometry(.6, .05, .3), frame); base.position.set(-.3, -.66, 0); g.add(base);
      const ph = new THREE.Mesh(new RB(.42, .8, .07, 3, .05), frame); ph.position.set(.8, -.24, .12); ph.castShadow = true; g.add(ph); const ps2 = new THREE.Mesh(new THREE.PlaneGeometry(.34, .66), new THREE.MeshBasicMaterial({ color: '#8FD3D8', toneMapped: false })); ps2.position.set(.8, -.24, .16); g.add(ps2); }
    if (id === 'core') { const chip = new THREE.Mesh(new RB(1.1, 1.1, .18, 3, .05), symMat('#0E3A42', .1)); chip.castShadow = true; g.add(chip); const pin = symMat('#D9B45A', .05);
      for (let i = 0; i < 5; i++) { const o = -.4 + i * .2; for (const [x, y, rx] of [[o, .66, 0], [o, -.66, 0], [.66, o, 1], [-.66, o, 1]]) { const p = new THREE.Mesh(new THREE.BoxGeometry(rx ? .22 : .07, rx ? .07 : .22, .05), pin); p.position.set(x, y, 0); g.add(p); } }
      const ai = new THREE.Mesh(new THREE.PlaneGeometry(.8, .8), new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false, depthWrite: false, map: tex(256, 256, (gg) => { gg.fillStyle = '#5FE0E8'; gg.font = '700 130px "Space Grotesk"'; gg.textAlign = 'center'; gg.textBaseline = 'middle'; gg.fillText('AI', 128, 136); }) })); ai.position.z = .1; g.add(ai); }
    return g;
  }
  const symY = i => .95 + i * 1.5;
  slabs.forEach((sl, i) => {
    sl.sym = makeSym(sl.l.id); sl.sym.position.set(0, symY(i), .3); sl.sym.scale.setScalar(.001); rig.add(sl.sym);
    sl.left = L2(lbl('', h('div', { style: { transform: 'translateX(-50%)', font: '600 17px var(--display)', background: 'rgba(8,18,40,.9)', border: '1px solid rgba(143,211,216,.34)', 'border-radius': '10px', padding: '5px 12px' } }, sl.l.name)), rig, new V3(-1.35, symY(i), .3));
  });
  /* platform block: the six symbols, three per row */
  const BASE_H = 2.7, SLOT_X = [-2.45, 0, 2.45];
  const slot = i => new V3(SLOT_X[i % 3], F0 + .9 + Math.floor(i / 3) * 1.22, FD / 2 + .32);
  const base = new THREE.Mesh(new RB(FW, BASE_H, FD, 4, .08), new THREE.MeshPhysicalMaterial({ color: '#0E2140', roughness: .55, metalness: .15, clearcoat: .2, emissive: '#14A3AE', emissiveIntensity: .05 }));
  base.position.y = F0 + BASE_H / 2; base.castShadow = base.receiveShadow = true; base.scale.setScalar(.001); rig.add(base);
  { const PW = FW - .2, PH = BASE_H - .1; const face = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false, map: tex(1520, 460, (g, w, hh) => {
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '600 34px Inter'; g.fillStyle = 'rgba(214,232,246,.95)';
      slabs.forEach((sl, i) => { const p = slot(i); const u = (p.x + PW / 2) / PW * w, v = (1 - ((p.y - .6 - (F0 + BASE_H / 2)) + PH / 2) / PH) * hh; g.fillText(sl.l.name, u, v); }); }) }));
    face.position.z = FD / 2 + .005; base.add(face); }
  base.userData = { tip: ['In-Sync platform', 'Six layers: services, data, logic, APIs, screens, and the layer we built ourselves.'] };
  slabs.forEach(sl => { sl.m.visible = false; });
  const LY = Object.fromEntries(slabs.map((s, i) => [s.l.id, slot(i).y]));
  const foundTop = F0 + BASE_H;

  /* blocks */
  const cube = new RB(1, 1, 1, 4, .14);
  const tileTex = (name, ink) => tex(512, 512, (g, w, hh) => { const c = ink ? '#0B1530' : '#fff'; glyph(g, ICONS[name], w / 2, hh * .42, 250, c); g.fillStyle = c; g.textAlign = 'center'; let fs = 58; const fit = () => { g.font = `600 ${fs}px "Space Grotesk"`; const out = []; let cur = ''; for (const wd of name.split(' ')) { const t = cur ? cur + ' ' + wd : wd; if (g.measureText(t).width > w - 40 && cur) { out.push(cur); cur = wd; } else cur = t; } out.push(cur); return out; }; let ls = fit(); while ((ls.length > 2 || ls.some(x => g.measureText(x).width > w - 40)) && fs > 34) { fs -= 4; ls = fit(); } const y0 = ls.length === 1 ? hh * .86 : hh * .80; ls.forEach((t, i) => g.fillText(t, w / 2, y0 + i * fs * 1.05)); });
  const wideTex = (name, sub, ink) => tex(1024, 300, (g, w, hh) => { const c = ink ? '#0B1530' : '#fff'; glyph(g, ICONS[name], 150, hh / 2, 200, c); g.fillStyle = ink ? 'rgba(11,21,48,.7)' : 'rgba(255,255,255,.8)'; g.font = '600 38px Inter'; g.fillText(sub.toUpperCase(), 290, 92); g.fillStyle = c; let fs = 86; const fit = () => { g.font = `600 ${fs}px "Space Grotesk"`; const out = []; let cur = ''; for (const wd of name.split(' ')) { const t = cur ? cur + ' ' + wd : wd; if (g.measureText(t).width > w - 320 && cur) { out.push(cur); cur = wd; } else cur = t; } out.push(cur); return out; }; let ls = fit(); while ((ls.length > 2 || ls.some(x => g.measureText(x).width > w - 320)) && fs > 46) { fs -= 4; ls = fit(); } ls.forEach((t, i) => g.fillText(t, 290, 190 + (i - (ls.length - 1)) * fs * 1.0 + (ls.length - 1) * fs * .45)); });
  const makeBlock = (name, color, sub, ink) => {
    const grp = new THREE.Group(); const col = new THREE.Color(color);
    const mesh = new THREE.Mesh(cube, new THREE.MeshPhysicalMaterial({ color: col, roughness: .38, clearcoat: .6, clearcoatRoughness: .25, emissive: col, emissiveIntensity: .06, transparent: true })); mesh.castShadow = mesh.receiveShadow = true; grp.add(mesh);
    const lmT = new THREE.MeshBasicMaterial({ map: tileTex(name, ink), transparent: true, toneMapped: false, depthWrite: false });
    const lmW = new THREE.MeshBasicMaterial({ map: wideTex(name, sub, ink), transparent: true, toneMapped: false, depthWrite: false });
    const fT = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), lmT), fW = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), lmW); grp.add(fT, fW);
    const lm = { set opacity(v) { lmT.opacity = v; lmW.opacity = v; }, get opacity() { return lmT.opacity; } };
    return { grp, mesh, fT, fW, lm, size: new V3(.86, .86, .3), sizeT: new V3(.86, .86, .3), name };
  };
  const setSize = (o, k) => { o.size.lerp(o.sizeT, k); const s = o.size; o.mesh.scale.copy(s); const wide = s.x > s.y * 1.7;
    o.fT.visible = !wide; o.fW.visible = wide;
    if (wide) { let lh = s.y - .1, lw = lh * 1024 / 300; if (lw > s.x - .1) { lw = s.x - .1; lh = lw * 300 / 1024; } o.fW.scale.set(Math.max(.001, lw), Math.max(.001, lh), 1); o.fW.position.set(-s.x / 2 + .05 + lw / 2, 0, s.z / 2 + .006); }
    else { const q = Math.max(.001, Math.min(s.x, s.y) - .06); o.fT.scale.set(q, q, 1); o.fT.position.set(0, 0, s.z / 2 + .006); } };

  // library wall behind the platform station
  const WALL_Z = -7.5, ROWS = [.6, 1.65, 2.7];
  const cols = []; D.groups.forEach((gr, gi) => { const items = D.blocks.filter(b => b.g === gr.id).map(b => b.name); for (let c = 0; c < Math.ceil(items.length / 3); c++) cols.push({ gi, items: items.slice(c * 3, c * 3 + 3) }); });
  const wallW = cols.length * 1.2 + (D.groups.length - 1) * .8; let cx = -wallW / 2 - 1 + .6, lastG = 0; const wallPos = {}; const gX = {};
  cols.forEach(col => { if (col.gi !== lastG) { cx += .8; lastG = col.gi; } (gX[D.groups[col.gi].id] ||= []).push(cx); col.items.forEach((n, r) => { wallPos[n] = new V3(cx, ROWS[r], WALL_Z); }); cx += 1.2; });
  const grpL = D.groups.map(g => { const xs = gX[g.id]; const o = L2(lbl('sta', g.name), scene, new V3((xs[0] + xs[xs.length - 1]) / 2, 3.7, WALL_Z)); o.element.style.borderColor = g.color; return o; });

  // the build: which blocks, where they land
  const stories = D.stories;
  const picked = stories.flatMap(s => s.blocks);
  const FLOORS = [['Google & Meta ads', 'Websites & forms'], ['AI calling', 'WhatsApp', 'Support desk'], ['KYC checks', 'Field sales', 'Pipelines & tasks'], ['Quote to invoice', 'Payments & wallets'], ['Dashboards', 'KPIs & payroll'], ['Regulator report']];
  const BW = 6.8, BD = 2.0, BGAP = .18, SLAB = .07;
  const floorLocal = {}; let fy = foundTop + .06; const floorY = [];
  FLOORS.forEach(fl => { const n = fl.length, bh = .9, bw = (BW - BGAP * (n - 1)) / n; floorY.push(fy); fl.forEach((name, j) => { floorLocal[name] = { pos: new V3(-BW / 2 + bw / 2 + j * (bw + BGAP), fy + SLAB + bh / 2, 0), size: new V3(bw, bh, BD) }; }); fy += SLAB + bh + .15; });
  const PS_Y = fy; const towerTop = fy; const towerTop2 = fy + SLAB + .6 + .15;
  const floorSlabs = FLOORS.map((fl, i) => { const m = new THREE.Mesh(new THREE.BoxGeometry(BW + .35, SLAB, BD + .3), new THREE.MeshStandardMaterial({ color: '#16304F', roughness: .3, metalness: .3, transparent: true, opacity: 0, emissive: '#14A3AE', emissiveIntensity: .25 })); m.position.y = floorY[i] + SLAB / 2; m.scale.set(.001, 1, .001); rig.add(m); return m; });
  const psSlab = new THREE.Mesh(new THREE.BoxGeometry(BW + .35, SLAB, BD + .3), new THREE.MeshStandardMaterial({ color: '#16304F', transparent: true, opacity: 0, emissive: '#14A3AE', emissiveIntensity: .25 })); psSlab.position.y = PS_Y + SLAB / 2; psSlab.scale.set(.001, 1, .001); rig.add(psSlab);

  const all = {};
  D.blocks.forEach((b, i) => {
    const o = makeBlock(b.name, G[b.g].color, G[b.g].name.split(' ')[0], INK[b.g]); o.b = b; o.phase = i * .37; o.mesh.userData = { tip: [b.name, null, b.inside] };
    o.grp.position.copy(wallPos[b.name]); scene.add(o.grp); setSize(o, 1);
    o.ghost = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.9, .9, .3)), new THREE.LineBasicMaterial({ color: '#8FD3D8', transparent: true, opacity: 0, toneMapped: false })); o.ghost.position.copy(wallPos[b.name]); scene.add(o.ghost);
    all[b.name] = o;
  });
  const custom = makeBlock('Regulator report', '#B9C8DC', 'Built new by AI', true); custom.mesh.material.emissiveIntensity = 0; custom.mesh.userData = { tip: ['Regulator report', 'Built new by AI for this client, from the gap in the fit-gap analysis.'] };
  custom.wire = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), new THREE.LineDashedMaterial({ color: '#F2B24C', dashSize: .08, gapSize: .06, transparent: true, opacity: 0, toneMapped: false })); custom.wire.computeLineDistances(); custom.grp.add(custom.wire); rig.add(custom.grp); all['Regulator report'] = custom;
  const ps = makeBlock('Post-sales service', G.serve.color, 'Added after go-live', true); ps.mesh.userData = { tip: ['Post-sales service', 'A change request after go-live, approved by an expert and built by AI.'] }; rig.add(ps.grp); ps.grp.visible = false;

  // kit positions above the platform (local to the rig)
  const kitLocal = {}; [...picked, 'Regulator report'].forEach((n, i) => { const r = Math.floor(i / 7), c = i % 7; kitLocal[n] = new V3(-2.9 + c * .97, foundTop + 2.4 + r * .95, -.3); });

  // story cards and their lines to the wall
  const storyL = stories.map((s, i) => { const el = lbl('story' + (s.gap ? ' gap' : ''), s.gap ? [s.short, ' → ', h('i', {}, 'build new')] : s.short); return L2(el, scene, new V3(7, 8 - i * 1.1, 1.5)); });
  const storyLines = stories.map(s => (s.gap ? ['Regulator report'] : s.blocks).map(n => { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V3(), new V3()]), new THREE.LineBasicMaterial({ color: s.gap ? '#F2B24C' : '#8FD3D8', transparent: true, opacity: 0, toneMapped: false })); scene.add(l); return { l, n }; }));
  const protoL = L2(lbl('chip3 warm', 'Prototype in 2 days'), scene, new V3(-1, 7.2, 0));

  /* commercials: four documents signed */
  const docs = ['SOW', 'MSA', 'SLA', 'DPA'].map((n, i) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.75, .05), new THREE.MeshStandardMaterial({ color: '#B9C4D3', roughness: .7, emissive: '#4FD1A5', emissiveIntensity: 0 })); m.position.set(26 + i * 1.75, 1.15, 1.6); m.rotation.y = -.25; m.castShadow = true; m.scale.setScalar(.001); scene.add(m);
    const lines = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.2), new THREE.MeshBasicMaterial({ transparent: true, map: tex(200, 240, (g) => { g.fillStyle = '#9AA6B8'; for (let y = 30; y < 230; y += 22) g.fillRect(20, y, 160 - (y % 3) * 18, 7); }) })); lines.position.z = .03; m.add(lines);
    return { m, title: L2(lbl('doc3', n), m, new V3(0, 1.05, 0)), stamp: L2(lbl('stamp', 'Signed ✓'), m, new V3(0, -.2, 0)) };
  });
  const day0L = L2(lbl('big3', 'Day 0 · Sign-off'), scene, new V3(29, 3.6, 1.2));

  /* integrations: a rack at the build station; nodes plug into the API layer and travel with the build */
  const EXTS = [['Surepass', 'KYC checks'], ['Exotel', 'WhatsApp'], ['LiveKit', 'AI calling'], ['ElevenLabs', 'AI calling'], ['Groq', 'AI calling'], ['Cerebras', 'Dashboards'], ['Gemini', 'Regulator report'], ['Claude', 'Regulator report'], ['Razorpay', 'Payments & wallets'], ['Resend', 'WhatsApp']];
  const rackX = 48.5;
  const ext = EXTS.map(([name, trigger], i) => {
    const grp = new THREE.Group(); const rackPos = new V3(rackX + (i % 2) * 1.6, 1.2 + Math.floor(i / 2) * 1.15, -1 + (i % 2) * .6); grp.position.copy(rackPos); scene.add(grp);
    const core = new THREE.Mesh(new THREE.SphereGeometry(.2, 24, 16), new THREE.MeshBasicMaterial({ color: '#CFFBFF', toneMapped: false })); grp.add(core); core.userData = { tip: [name, D.integrations.find(x => x.name === name)?.kind] };
    const halo = new THREE.Sprite(spriteM('#7FF4FA', .9)); halo.scale.setScalar(1); grp.add(halo);
    const nameL = L2(lbl('chip3', name), grp, new V3(0, .45, 0));
    const a = -Math.PI * .8 + i * (Math.PI * 1.6 / (EXTS.length - 1)); const satLocal = new V3(Math.sin(a) * 5.4, LY.apis + 1.2 + (i % 2) * 1.0, Math.cos(a) * 2.9);
    const anchor = new V3(Math.max(-3.6, Math.min(3.6, Math.sin(a) * 4)), LY.apis, Math.max(-1.3, Math.min(1.35, Math.cos(a) * 1.5)));
    const cable = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V3(), new V3()]), new THREE.LineBasicMaterial({ color: '#5FE0E8', transparent: true, opacity: 0, toneMapped: false })); scene.add(cable);
    const pulses = [0, 1].map(j => { const sp = new THREE.Sprite(spriteM(j ? '#FFC86A' : '#9FF6FA', 0)); sp.scale.setScalar(.34); scene.add(sp); return sp; });
    return { name, trigger, grp, core, nameL, rackPos, satLocal, anchor, cable, pulses, onRig: false };
  });
  // API spine on the rig
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, 1, 12), new THREE.MeshBasicMaterial({ color: '#5FE0E8', transparent: true, opacity: 0, toneMapped: false })); spine.position.set(-BW / 2 - .55, 0, BD / 2 + .32); rig.add(spine);
  const noSprintL = L2(lbl('big3', 'No sprints · Days 1–2'), rig, new V3(0, towerTop + 1.6, 0));
  const aiTagL = L2(lbl('chip3 ai', 'AI built this block'), rig, new V3(floorLocal['Regulator report'].pos.x, floorLocal['Regulator report'].pos.y + .9, BD / 2));

  /* testing gate */
  const gate = new THREE.Group(); gate.position.set(60, 0, 0); scene.add(gate);
  const gm = new THREE.MeshStandardMaterial({ color: '#122a4d', roughness: .4, metalness: .5, emissive: '#2BB6C0', emissiveIntensity: .35 });
  const gh = towerTop + 1.6;
  for (const z of [-2.6, 2.6]) { const p = new THREE.Mesh(new THREE.BoxGeometry(.35, gh, .35), gm); p.position.set(0, gh / 2, z); p.castShadow = true; gate.add(p); }
  { const t = new THREE.Mesh(new THREE.BoxGeometry(.4, .35, 5.6), gm); t.position.set(0, gh, 0); gate.add(t); }
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1), new THREE.MeshBasicMaterial({ color: '#7FF4FA', transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); scan.rotation.y = Math.PI / 2; scan.scale.y = .08; gate.add(scan);
  const testL = ['SIT ✓', 'UAT ✓', 'Security ✓'].map((t, i) => L2(lbl('chip3 ok', t), gate, new V3(0, gh + .6 + i * .55, 0)));
  const floorTicks = FLOORS.map((fl, i) => L2(lbl('chip3 ok', '✓'), rig, new V3(BW / 2 + .7, floorY[i] + .5, BD / 2)));

  /* deployment: globe, region beam, dome, live */
  const globe = new THREE.Group(); globe.position.set(71.5, 4.4, -2.5); scene.add(globe);
  const GR = 2.3; const ll = (lat, lon, r = GR) => { const la = lat * Math.PI / 180, lo = lon * Math.PI / 180; return new V3(Math.cos(la) * Math.sin(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.cos(lo) * r); };
  const spin = new THREE.Group(); globe.add(spin);
  spin.add(new THREE.Mesh(new THREE.SphereGeometry(GR * .985, 48, 32), new THREE.MeshBasicMaterial({ color: '#081633' })));
  spin.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(DOTS.map(([x, y]) => ll(90 - y * 3, x * 3 - 180))), new THREE.PointsMaterial({ size: .07, color: '#58C6E0', toneMapped: false })));
  const regs = D.regions.map(([name, lat, lon]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(.09, 12, 8), new THREE.MeshBasicMaterial({ color: '#FFD27A', toneMapped: false })); m.position.copy(ll(lat, lon, GR * 1.01)); spin.add(m); return { name, lat, lon, m }; });
  const mumbai = regs.find(r => r.name === 'Mumbai'); spin.rotation.y = -.35 - mumbai.lon * Math.PI / 180; spin.rotation.x = mumbai.lat * Math.PI / 180 * .5;
  const regHalo = new THREE.Sprite(spriteM('#FFD27A', 0)); regHalo.visible = false; spin.add(regHalo);
  const regL = L2(lbl('chip3 warm', 'Any AWS region the client needs'), globe, new V3(0, GR + .55, 0));
  const keyL = L2(lbl('chip3 warm', h('span', { class: 'ms' }, 'key'), ' Encrypted with the client’s key'), rig, new V3(-FW / 2 - .2, LY.data, FD / 2 + .2));
  const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V3(), new V3()]), new THREE.LineBasicMaterial({ color: '#FFD27A', transparent: true, opacity: 0, toneMapped: false })); scene.add(beam);
  const domeMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, uniforms: { uR: { value: 0 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; varying float vY; void main(){ vY=position.y; vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz); vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*mv; }',
    fragmentShader: 'varying vec3 vN; varying vec3 vV; varying float vY; uniform float uR; void main(){ if(vY>uR) discard; float f=pow(1.-abs(dot(normalize(vN),vV)),2.2); float e=smoothstep(uR-.05,uR,vY)*step(uR,.995); gl_FragColor=vec4(vec3(.12,.7,.75)*(.03+f*.5)+vec3(.7,1.,1.)*e*1.3,1.); }' });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2), domeMat); rig.add(dome); let domeR = 0, domeH = towerTop + 1.2;
  const liveL = L2(lbl('big3', h('span', { class: 'ms' }, 'lock'), ' Secured · Live · Day 3'), rig, new V3(0, towerTop + 2.0, 0));
  const beacon = new THREE.Sprite(spriteM('#4FD1A5', 0)); beacon.scale.setScalar(2.2); rig.add(beacon);

  /* training: one figure per team, linked to the floor they use */
  const TEAMS = [['Sales', 'AI calling', '#3D74E0'], ['Service', 'Support desk', '#3D74E0'], ['Field', 'Field sales', '#D68A2A'], ['Finance', 'Quote to invoice', '#E0662E'], ['Leadership', 'Dashboards', '#B84A8F']];
  const people = TEAMS.map(([team, block, color], i) => {
    const grp = new THREE.Group(); const a = -.95 + i * .48; grp.position.set(100 + Math.sin(a) * 7.2, 0, Math.cos(a) * 4.6 + .8); scene.add(grp);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: .5, emissive: color, emissiveIntensity: .15 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(.32, .7, 6, 16), mat); body.position.y = .7; body.castShadow = true; grp.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.26, 20, 14), mat); head.position.y = 1.55; head.castShadow = true; grp.add(head);
    grp.scale.setScalar(.001);
    const l = L2(lbl('chip3', team + ' team'), grp, new V3(0, 2.2, 0)); const ok = L2(lbl('chip3 ok', 'Trained ✓'), grp, new V3(0, 2.7, 0));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V3(), new V3()]), new THREE.LineDashedMaterial({ color: '#8FD3D8', dashSize: .2, gapSize: .12, transparent: true, opacity: 0, toneMapped: false })); scene.add(line);
    return { grp, l, ok, line, block };
  });

  /* documentation: a stack of documents */
  const DOCS = ['User manual', 'SOPs', 'Admin guide', 'API docs', 'Release notes'];
  const stack = DOCS.map((n, i) => { const m = new THREE.Mesh(new RB(2.6, .22, 1.9, 2, .03), new THREE.MeshStandardMaterial({ color: i % 2 ? '#B9C4D3' : '#A9B6C8', roughness: .7 })); m.position.set(126, .11 + i * .25 + 6, 1.2); m.rotation.y = (i % 2 ? .06 : -.05); m.castShadow = true; m.visible = false; scene.add(m); return { m, l: L2(lbl('doc3', n), scene, new V3(127.7 + (i % 2) * .4, .11 + i * .25, 2.2)) }; });
  const day7L = { banner: h('div', { class: 'banner', 'aria-live': 'polite' }, h('b', {}, 'Day 7 · Wow! The hard work paid off.'), h('span', {}, 'Your platform is LIVE. You paid nothing to build it.'), h('small', {}, 'Typical custom build: 3–6 months · Source: iLink, RaftLabs')) }; add(day7L.banner);

  /* after go-live: change request flow */
  const flowEls = ['Change request', 'WorkSync task', 'Expert approves', 'AI builds it'].map((t, i) => h('span', {}, t));
  const flowL = L2(lbl('flow3', flowEls.flatMap((e, i) => i ? [h('em', {}, '→'), e] : [e])), rig, new V3(0, towerTop2 + 1.6, 0));
  const crL = L2(lbl('story', '“Let customers ask for an NOC on WhatsApp”'), rig, new V3(-10.5, PS_Y + 1.6, 0));
  const sameWeekL = L2(lbl('big3', 'Live the same day'), rig, new V3(4.6, PS_Y + .4, 1.2));

  /* dust */
  const N = LITE ? 160 : 420, dpos = new Float32Array(N * 3), dbase = []; let rs = 7; const R = () => ((rs = (rs * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < N; i++) dbase.push([-20 + R() * 180, R() * 16, -18 + R() * 30, R()]);
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dpos, 3)); scene.add(new THREE.Points(dg, new THREE.PointsMaterial({ size: .07, map: glow, color: '#8FD3D8', transparent: true, opacity: .45, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })));

  /* post-processing */
  const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera)); const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), .45, .55, .86); composer.addPass(bloom); composer.addPass(new OutputPass());

  /* camera */
  const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.minDistance = 5; controls.maxDistance = 140; controls.maxPolarAngle = Math.PI * .49; controls.enableZoom = false; if (COARSE) { controls.enabled = false; } renderer.domElement.style.touchAction = COARSE ? 'pan-y' : 'pan-y pinch-zoom';
  let userCam = false; renderer.domElement.addEventListener('pointerdown', () => { if (controls.enabled) userCam = true; });
  const CAM = {
    architecture: [new V3(1.5, 6.5, 21), new V3(1.5, 4.6, 0)],
    platform: [new V3(-1, 6.4, 19.5), new V3(-.5, 2.3, -4)],
    requirements: [new V3(3, 8, 24), new V3(3, 3.8, -1.5)],
    commercials: [new V3(4, 7, 22), new V3(4.5, 3, 0)],
    build: [new V3(1.5, 9, 26), new V3(1.5, 4.8, 0)],
    testing: [new V3(-4.5, 8.5, 24), new V3(1.5, 4.8, 0)],
    deployment: [new V3(-3.5, 9, 27), new V3(-1.5, 5, -1)],
    training: [new V3(3, 10, 28), new V3(2.5, 4.2, 1)],
    documentation: [new V3(4.5, 10.5, 27), new V3(4, 6.4, 0)],
    after: [new V3(.5, 11, 28), new V3(0, 5.8, 0)],
  };
  const compact = () => matchMedia('(max-height: 560px), (max-width: 760px)').matches;
  function camGoal() {
    const s = STEPS[K];
    if (s.id === 'summary') return [new V3(176, 18, 38), new V3(108, 2, -2)];
    const [p, t] = CAM[s.id]; const x = rig.position.x; const pos = p.clone().add(new V3(x, 0, 0)), tgt = t.clone().add(new V3(x, 0, 0));
    if (compact()) { pos.sub(tgt).multiplyScalar(1.08).add(tgt); if (s.id === 'requirements') { pos.x += 3.5; tgt.x += 3.5; } }
    return [pos, tgt];
  }
  { const [p, t] = camGoal(); rig.position.x = STEPS[K].x; const [p2, t2] = camGoal(); camera.position.copy(p2); controls.target.copy(t2); }
  let capShift = 0;
  function resize() { const w = app.clientWidth, hh = app.clientHeight; renderer.setSize(w, hh, false); lr.setSize(w, hh); composer.setSize(w, hh); bloom.resolution.set(w / 2, hh / 2); camera.aspect = w / hh; capShift = Math.round((caption.offsetWidth + 24) / 2); camera.setViewOffset(w, hh, -capShift, 0, w, hh); camera.updateProjectionMatrix(); }
  const ro = new ResizeObserver(resize); ro.observe(app); resize();

  /* hover tips */
  const ray = new THREE.Raycaster(); const mv = new THREE.Vector2();
  const pickables = () => [base, ...Object.values(all).map(o => o.mesh), ps.mesh, ...ext.map(e => e.core)].filter(o => { let p = o; while (p) { if (!p.visible) return false; p = p.parent; } return true; });
  renderer.domElement.addEventListener('pointermove', ev => {
    const r = renderer.domElement.getBoundingClientRect(); mv.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(mv, camera);
    const o = ray.intersectObjects(pickables(), false)[0]?.object; renderer.domElement.style.cursor = o ? 'help' : 'grab';
    if (o && o.userData.tip) { const [t, sub, list] = o.userData.tip; tip.hidden = false; tip.style.left = (ev.clientX - r.left) + 'px'; tip.style.top = (ev.clientY - r.top) + 'px'; tip.replaceChildren(h('b', {}, t), sub ? h('div', {}, sub) : null, list ? h('ul', {}, list.map(x => h('li', {}, x))) : null); } else tip.hidden = true;
  });
  renderer.domElement.addEventListener('pointerleave', () => { tip.hidden = true; });

  /* choreography: every frame, place everything from (stage, time in stage) */
  const W = (o, parent) => { if (o.grp.parent !== parent) parent.attach(o.grp); };
  const tmp = new V3();
  let last = performance.now();
  function frame() {
    if (DEAD) return;
    if (!VISIBLE || INTRO || document.hidden) { last = performance.now(); RAF = RAF = requestAnimationFrame(frame); return; }
    const now = performance.now(), dt = Math.min(.05, (now - last) / 1000); last = now; const T = now / 1000; const t = reduced ? 99 : (INTRO ? -1 : T - enteredAt);
    const k = K - 1, ease = 1 - Math.exp(-dt * 4.5), slow = 1 - Math.exp(-dt * 1.4);   // k: -1 architecture, 0 library, 1 requirements … 9 summary

    // architecture: layers split apart into a labelled diagram
    const ex = K === 0 ? 1 : 0;
    slabs.forEach((sl, i) => {
      const sa = K === 0 ? seg(t, .4 + i * .8, 1.0 + i * .8) : 0;   // symbol in the diagram
      const ba = K === 0 ? 0 : K === 1 ? seg(t, .05 + i * .15, .4 + i * .15) : 1;   // slab in the platform base
      const inBase = K >= 1; const target = inBase ? slot(i) : new V3(0, symY(i) + (1 - sa) * 2, .3); const sc = inBase ? .44 : (sa > 0 ? .4 + .6 * sa : .001);
      sl.sym.position.lerp(target, K === 0 ? .25 : ease); sl.sym.scale.setScalar(Math.max(.001, sl.sym.scale.x + (sc - sl.sym.scale.x) * (K === 0 ? .25 : ease))); sl.sym.visible = sl.sym.scale.x > .01;
      sl.sym.rotation.y = inBase ? 0 : Math.sin(T * .6 + i) * .25;
      sl.sym.traverse(o => { if (o.userData.spin) o.rotation.z = T * .5 * o.userData.spin; });
      sl.right.position.set(1.35, symY(i), .3); setL(sl.right, ex && sl.right.userData.has ? seg(t, .9 + i * .8, 1.3 + i * .8) : 0); setL(sl.left, ex ? seg(t, .6 + i * .8, 1.0 + i * .8) : 0);
    });
    setL(secTitle, ex ? seg(t, 5.4, 5.8) : 0); { const ba = K === 0 ? 0 : K === 1 ? seg(t, 0, .6) : 1; base.scale.setScalar(Math.max(.001, base.scale.x + (Math.max(.001, ba) - base.scale.x) * .2)); base.visible = base.scale.x > .01; } secTitle.position.set(2.8, symY(5) + 1.2, .3);
    const at = (stage, tt) => k > stage || (k === stage && t >= tt);   // has this moment happened?
    const progress = (stage, a, b) => k > stage ? 1 : k < stage ? 0 : seg(t, a, b);

    // rig travels along the line
    const rx = STEPS[K].x; rig.position.x += (rx - rig.position.x) * slow;

    // wall labels
    grpL.forEach((o, gi) => setL(o, k < 0 ? 0 : k === 0 ? seg(t, .5 + gi * .55, .9 + gi * .55) : k === 1 ? 1 : .35));

    // stage 1: stories, lines, lit blocks, kit
    const STORY_T = i => .5 + i * .55, LIFT_T = .5 + stories.length * .55 + .9;
    stories.forEach((s, i) => {
      setL(storyL[i], k === 1 ? seg(t, STORY_T(i), STORY_T(i) + .4) : 0);
      storyLines[i].forEach(({ l, n }) => { const o = all[n]; const on = k === 1 && t > STORY_T(i) + .3; const card = storyL[i].getWorldPosition(tmp).clone(); const p = o.grp.getWorldPosition(new V3()); l.geometry.setFromPoints([card.add(new V3(-.1, 0, 0)), p]); fadeLine(l.material, on ? (t > LIFT_T + 1.5 ? .35 : .85) : 0); });
    });
    storyL.forEach((o, i) => { const c = compact(); o.position.set(7, c ? 7.2 - i * .95 : 8 - i * 1.1, 1.5); });
    setL(protoL, k === 1 ? seg(t, LIFT_T + 1.2, LIFT_T + 1.6) : 0); protoL.position.set(rig.position.x - 1, foundTop + 4.9, 0);
    for (const [n, o] of Object.entries(all)) {
      if (n === 'Regulator report') continue;
      const isPicked = picked.includes(n); const si = stories.findIndex(s => s.blocks.includes(n)); const j = picked.indexOf(n);
      const lit = isPicked && at(1, STORY_T(si) + .3);
      const lifted = isPicked && at(1, LIFT_T + j * .08);
      const fl = FLOORS.findIndex(f => f.includes(n)); const built = isPicked && at(3, .6 + fl * .75);
      if (built) { W(o, rig); o.grp.visible = true; o.grp.position.lerp(floorLocal[n].pos, ease); o.sizeT.copy(floorLocal[n].size); }
      else if (lifted) { W(o, rig); o.grp.visible = true; o.grp.position.lerp(kitLocal[n], ease); o.sizeT.set(.62, .62, .24); }
      else { W(o, scene); tmp.copy(wallPos[n]); if (!isPicked) tmp.y += Math.sin(T * 1.1 + o.phase) * .04; const gi = D.groups.findIndex(g => g.id === o.b.g); const ap = k < 0 ? 0 : k === 0 ? seg(t, .3 + gi * .55 + (wallPos[n].y - .6) * .08, .7 + gi * .55 + (wallPos[n].y - .6) * .08) : 1; tmp.y += (1 - ap) * 2.2; o.grp.position.lerp(tmp, ease); o.sizeT.set(Math.max(.001, .9 * ap), Math.max(.001, .9 * ap), Math.max(.001, .3 * ap)); o.grp.visible = ap > .01; }
      setSize(o, ease);
      const pulse = lit && !lifted ? .5 + .3 * Math.sin(T * 6) : 0; o.mesh.material.emissiveIntensity += ((pulse || .06) - o.mesh.material.emissiveIntensity) * .2;
      const dim = k < 0 ? .06 : k >= 1 && !isPicked ? (k === 1 ? .55 : .35) : 1; o.mesh.material.opacity += (dim - o.mesh.material.opacity) * .1; o.lm.opacity = o.mesh.material.opacity;
      o.ghost.material.opacity += ((lifted && k >= 1 ? .5 : 0) - o.ghost.material.opacity) * .1; o.ghost.visible = o.ghost.material.opacity > .02;
    }
    // the gap: a dashed outline in the kit, made solid by AI during the build
    { const o = custom; const appear = at(1, STORY_T(stories.length - 1) + .3); const built = at(3, .6 + 5 * .75);
      o.grp.visible = appear; o.grp.position.lerp(built ? floorLocal['Regulator report'].pos : kitLocal['Regulator report'], ease); o.sizeT.copy(built ? floorLocal['Regulator report'].size : new V3(.62, .62, .24)); setSize(o, ease);
      o.wire.scale.copy(o.size).multiplyScalar(1.02); o.wire.material.opacity += ((built ? 0 : .95) - o.wire.material.opacity) * .15;
      o.mesh.material.opacity += ((built ? 1 : 0) - o.mesh.material.opacity) * .12; o.lm.opacity = o.mesh.material.opacity; }
    setL(aiTagL, k === 3 ? seg(t, .6 + 5 * .75 + .3, .6 + 5 * .75 + .7) : 0);

    // floors appear under the blocks during the build
    floorSlabs.forEach((m, i) => { const on = at(3, .45 + i * .75); m.scale.x += ((on ? 1 : .001) - m.scale.x) * ease; m.scale.z = m.scale.x; m.material.opacity += ((on ? .75 : 0) - m.material.opacity) * ease; });

    // stage 2: documents signed
    docs.forEach((d, i) => { const show = k >= 2; d.m.scale.setScalar(d.m.scale.x + ((show ? 1 : .001) - d.m.scale.x) * ease); d.m.visible = d.m.scale.x > .01; setL(d.title, k === 2 ? progress(2, .2 + i * .3, .6 + i * .3) : 0); const signed = at(2, 1.6 + i * .45); setL(d.stamp, signed && k === 2 ? 1 : 0); d.m.material.emissiveIntensity += ((signed && k === 2 ? .12 : 0) - d.m.material.emissiveIntensity) * .1; });
    setL(day0L, k === 2 ? seg(t, 3.6, 4.1) : 0);

    // stage 3: API spine grows, integrations plug in and travel with the build
    const builtFloors = FLOORS.filter((f, i) => at(3, .6 + i * .75)).length;
    const spTop = builtFloors ? floorY[builtFloors - 1] + .5 : LY.apis; const sh = Math.max(.01, spTop - LY.apis + .3);
    spine.scale.y += (sh - spine.scale.y) * ease; spine.position.y = LY.apis - .15 + spine.scale.y / 2; spine.material.opacity += ((k >= 3 ? .9 : 0) - spine.material.opacity) * .1;
    setL(noSprintL, k === 3 ? seg(t, .3, .8) : 0);
    ext.forEach((e, i) => {
      const fl = FLOORS.findIndex(f => f.includes(e.trigger)); const plugged = at(3, .6 + fl * .75 + .5 + i * .05);
      if (plugged) { if (e.grp.parent !== rig) rig.attach(e.grp); e.grp.position.lerp(e.satLocal, ease); }
      else { if (e.grp.parent !== scene) scene.attach(e.grp); e.grp.position.lerp(e.rackPos, ease); }
      setL(e.nameL, k === 2 || k === 3 ? 1 : 0); e.grp.visible = k >= 2 || plugged;
      const a = rig.localToWorld(e.anchor.clone()); const p = e.grp.getWorldPosition(new V3());
      e.cable.geometry.setFromPoints([a, p]); fadeLine(e.cable.material, plugged ? .8 : 0);
      e.pulses.forEach((sp, j) => { const per = 1.5, ph = ((T + i * .21 + j * per / 2) % per) / per; sp.position.lerpVectors(j ? p : a, j ? a : p, ph); sp.material.opacity = e.cable.material.opacity * Math.sin(ph * Math.PI); });
    });

    // stage 4: testing gate scan + ticks
    { const sweep = k === 4 ? seg(t, 1.4, 4.2) : 0; scan.position.y = .2 + sweep * (towerTop - .1); scan.material.opacity += ((k === 4 && sweep > 0 && sweep < 1 ? .55 : 0) - scan.material.opacity) * .2;
      testL.forEach((o, i) => setL(o, k === 4 ? seg(t, 4.3 + i * .45, 4.6 + i * .45) : (k > 4 && k < 9 ? .0 : 0)));
      floorTicks.forEach((o, i) => setL(o, k === 4 ? seg(t, 1.4 + (i + .5) / FLOORS.length * 2.8, 1.6 + (i + .5) / FLOORS.length * 2.8) : 0)); }

    // stage 5: region beam, key, dome, live
    { const beamOn = k === 5 && t > .8; const wp = globe.position.clone().add(new V3(GR * .9, -.4, .8)); beam.geometry.setFromPoints([wp, rig.localToWorld(new V3(-FW / 2, LY.data, 0))]); fadeLine(beam.material, beamOn ? .95 : 0);
      setL(regL, k === 5 ? seg(t, .6, 1) : 0); setL(keyL, k === 5 ? seg(t, 1.6, 2) : 0); spin.rotation.y = T * .12;
      const domeT = at(5, 2.4) ? 1 : 0; domeR += (domeT - domeR) * (k >= 5 ? .025 : .08); domeMat.uniforms.uR.value = domeR; dome.visible = domeR > .01;
      domeH += ((at(8, 6.6) ? towerTop2 + 1.1 : towerTop + 1.2) - domeH) * .05; dome.scale.set(5.9, domeH, 5.9);
      const live = at(5, 4.2); setL(liveL, k === 5 ? (live ? 1 : 0) : 0); liveL.position.y = towerTop + 2.2; beacon.position.y = domeH; beacon.material.opacity += ((live && k < 9 ? .5 + .2 * Math.sin(T * 3) : 0) - beacon.material.opacity) * .1; }

    // stage 6: teams trained
    people.forEach((p, i) => { const show = k >= 6; const sc = p.grp.scale.x + ((show ? 1 : .001) - p.grp.scale.x) * ease; p.grp.scale.setScalar(sc); p.grp.visible = sc > .01;
      setL(p.l, k === 6 ? seg(t, .4 + i * .3, .8 + i * .3) : 0); setL(p.ok, k === 6 ? seg(t, 2.6 + i * .35, 3 + i * .35) : 0);
      const target = all[p.block].grp.getWorldPosition(new V3()); const from = p.grp.position.clone().add(new V3(0, 1.4, 0)); p.line.geometry.setFromPoints([from, target]); p.line.computeLineDistances(); fadeLine(p.line.material, k === 6 && t > 1 + i * .3 ? .7 : 0); });

    // stage 7: document stack
    stack.forEach((d, i) => { const show = at(7, .5 + i * .55); d.m.visible = show || d.m.position.y < 5.9; const y = show ? .11 + i * .25 : .11 + i * .25 + 6; d.m.position.y += (y - d.m.position.y) * ease; setL(d.l, k === 7 ? (show ? 1 : 0) : 0); });
    { const v = k === 7 ? seg(t, 3.6, 4.1) : 0; day7L.banner.style.opacity = v.toFixed(3); day7L.banner.style.visibility = v > .01 ? 'visible' : 'hidden'; }

    // stage 8: change request becomes a new block
    { setL(crL, k === 8 ? seg(t, .4, .8) * (1 - seg(t, 6.2, 6.6)) : 0); setL(flowL, k === 8 ? seg(t, 1, 1.4) : 0);
      flowEls.forEach((e, i) => { const on = k === 8 && t > 1 + i * 1.3; e.className = on ? (i === 2 ? 'ok' : 'on') : ''; });
      flowL.position.y = towerTop2 + 1.8;
      const drop = at(8, 6); ps.grp.visible = drop; const target = new V3(0, PS_Y + SLAB + .3, 0); if (!drop) ps.grp.position.set(0, towerTop2 + 6, 0); ps.grp.position.lerp(target, ease); ps.sizeT.set(BW, .6, BD); setSize(ps, 1);
      psSlab.scale.x += ((drop ? 1 : .001) - psSlab.scale.x) * ease; psSlab.scale.z = psSlab.scale.x; psSlab.material.opacity = drop ? .75 : 0;
      setL(sameWeekL, k === 8 ? seg(t, 7, 7.4) : 0); }

    // station markers
    staL.forEach((o, i) => { const sx = STATIONS[i][2]; const on = Math.abs(rig.position.x - sx) < 3 || (i === 1 && k <= 2 && k >= 1); setL(o, k === 9 ? 1 : (on ? 1 : .55)); o.element.classList.toggle('on', on && k !== 9); o.element.classList.toggle('keep', k === 9); });

    // camera follows the build unless the presenter is looking around
    if (!userCam) { const [p, tg] = camGoal(); const ck = 1 - Math.exp(-dt * 2.2); camera.position.lerp(p, ck); controls.target.lerp(tg, ck); }
    controls.update(); camXZ.set(camera.position.x, camera.position.z);
    key.position.set(rig.position.x - 10, 20, 14); key.target.position.set(rig.position.x, 0, 0); rim.position.set(rig.position.x + 8, 8, -14); rim.target.position.set(rig.position.x, 0, 0);
    dbase.forEach((d, i) => { dpos[i * 3] = d[0] + Math.sin(T * .2 + d[3] * 9) * .4; dpos[i * 3 + 1] = (d[1] + T * .12 * (.4 + d[3])) % 16; dpos[i * 3 + 2] = d[2] + Math.cos(T * .17 + d[3] * 7) * .4; }); dg.attributes.position.needsUpdate = true;
    if (Math.round((caption.offsetWidth + 24) / 2) !== capShift) resize();
    if (LITE) renderer.render(scene, camera); else composer.render(); lr.render(scene, camera);
    RAF = requestAnimationFrame(frame);
  }
  RAF = requestAnimationFrame(frame);
  return { onStep() { userCam = false; }, dispose() {
    cancelAnimationFrame(RAF); ro.disconnect(); controls.dispose();
    scene.traverse(o => { o.geometry?.dispose?.(); const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []; ms.forEach(m => { m.map?.dispose?.(); m.dispose?.(); }); });
    composer.dispose?.(); renderer.dispose(); renderer.forceContextLoss();
  } };
}

}
