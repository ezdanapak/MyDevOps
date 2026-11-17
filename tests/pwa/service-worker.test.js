// Runs service-worker.js in a mocked environment (no real browser). Node 18+: `node --test tests/pwa/`
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = fs.readFileSync(path.join(__dirname, '..', '..', 'docs', 'service-worker.js'), 'utf8');
const ORIGIN = 'https://example.test';
const ROOT = '/MyDevOps/';

function makeEnv(network) {
  const listeners = {};
  const store = new Map(); // cacheName -> Map(url -> response)
  const calls = [];
  class Resp {
    constructor(body, o = {}) { this.body = body; this.status = o.status ?? 200; this.type = o.type ?? 'basic'; }
    clone() { return new Resp(this.body, { status: this.status, type: this.type }); }
  }
  const caches = {
    open: async (n) => {
      if (!store.has(n)) store.set(n, new Map());
      const m = store.get(n);
      return { put: async (r, res) => { m.set(typeof r === 'string' ? r : r.url, res); }, addAll: async (urls) => { urls.forEach((u) => m.set(u, new Resp('shell:' + u))); } };
    },
    keys: async () => [...store.keys()],
    delete: async (n) => store.delete(n),
    match: async (r) => { const u = typeof r === 'string' ? r : r.url; for (const m of store.values()) if (m.has(u)) return m.get(u); return undefined; },
  };
  const self = {
    location: new URL(ORIGIN + ROOT + 'service-worker.js'),
    addEventListener: (t, fn) => { listeners[t] = fn; },
    skipWaiting: () => { calls.push('skipWaiting'); },
    clients: { claim: async () => { calls.push('claim'); } },
  };
  const ctx = vm.createContext({ self, caches, URL, Promise, console, fetch: async (req) => network(req, calls) });
  vm.runInContext(SRC, ctx);
  const dispatch = async (type, ev) => { let p; ev.waitUntil = (x) => { p = x; }; ev.respondWith = (x) => { ev.responded = x; }; listeners[type](ev); if (p) await p; return ev.responded ? await ev.responded : undefined; };
  return { store, calls, dispatch, Resp, listeners };
}
const req = (p, extra = {}) => ({ url: ORIGIN + p, method: 'GET', ...extra });
const ok = (R, body = 'net') => new R(body);

test('install precaches the app shell only, no skipWaiting', async () => {
  const e = makeEnv(async () => { throw new Error('offline'); });
  await e.dispatch('install', {});
  const names = [...e.store.keys()];
  assert.deepStrictEqual(names, ['mydevops-precache-v1']);
  const urls = [...e.store.get(names[0]).keys()];
  assert.ok(urls.includes(ORIGIN + ROOT + 'offline.html'));
  assert.ok(urls.length < 20, 'shell stays small');
  assert.ok(!e.calls.includes('skipWaiting'));
});

test('activate deletes only old mydevops-* caches', async () => {
  const e = makeEnv(async () => { throw new Error('x'); });
  for (const n of ['mydevops-precache-v0', 'mydevops-runtime-v0', 'mydevops-precache-v1', 'other-project-cache', 'mydevops-runtime-v1']) await (await (async () => e)()).store.set(n, new Map());
  await e.dispatch('activate', {});
  assert.deepStrictEqual([...e.store.keys()].sort(), ['mydevops-precache-v1', 'mydevops-runtime-v1', 'other-project-cache']);
  assert.ok(e.calls.includes('claim'));
});

test('SKIP_WAITING message calls skipWaiting', async () => {
  const e = makeEnv(async () => { throw new Error('x'); });
  e.listeners.message({ data: { type: 'SKIP_WAITING' } });
  assert.ok(e.calls.includes('skipWaiting'));
});

test('ignores non-GET, cross-origin and out-of-scope requests', async () => {
  const e = makeEnv(async () => { throw new Error('should not fetch'); });
  for (const r of [req(ROOT + 'a/', { method: 'POST' }), { url: 'https://cdn.example/x.js', method: 'GET' }, req('/other-project/page/')]) {
    const ev = { request: r };
    e.listeners.fetch(ev);
    assert.strictEqual(ev.responded, undefined, r.url);
  }
});

test('HTML is network-first and cached; falls back to cache then offline.html', async () => {
  let online = true;
  const e = makeEnv(async (r) => { if (!online) throw new Error('offline'); return ok(e.Resp, 'net:' + r.url); });
  await e.dispatch('install', {});
  const lesson = req(ROOT + 'academy/linux/permissions/');
  let res = await e.dispatch('fetch', { request: lesson });
  assert.strictEqual(res.body, 'net:' + lesson.url);
  await new Promise((r) => setImmediate(r));
  online = false;
  res = await e.dispatch('fetch', { request: lesson });
  assert.strictEqual(res.body, 'net:' + lesson.url, 'visited page served from cache offline');
  res = await e.dispatch('fetch', { request: req(ROOT + 'never/visited/') });
  assert.strictEqual(res.body, 'shell:' + ORIGIN + ROOT + 'offline.html', 'unvisited page -> offline.html');
});

test('only status 200 + type basic responses are cached', async () => {
  const e = makeEnv(async (r) => r.url.includes('404') ? new e.Resp('nf', { status: 404 }) : r.url.includes('opaque') ? new e.Resp('o', { type: 'opaque' }) : new e.Resp('redir', { type: 'opaqueredirect' }));
  for (const p of ['404/', 'opaque/', 'redir/']) await e.dispatch('fetch', { request: req(ROOT + p) });
  await new Promise((r) => setImmediate(r));
  const runtime = e.store.get('mydevops-runtime-v1');
  assert.ok(!runtime || runtime.size === 0);
});

test('hashed assets are cache-first; other static is stale-while-revalidate; search index SWR', async () => {
  let hits = 0;
  const e = makeEnv(async () => { hits++; return new e.Resp('v' + hits); });
  const hashed = req(ROOT + 'assets/stylesheets/main.57a0d79d.min.css');
  await e.dispatch('fetch', { request: hashed });
  await new Promise((r) => setImmediate(r));
  const before = hits;
  const again = await e.dispatch('fetch', { request: hashed });
  assert.strictEqual(hits, before, 'hashed served from cache without network');
  assert.strictEqual(again.body, 'v1');
  const idx = req(ROOT + 'search/search_index.json');
  await e.dispatch('fetch', { request: idx });
  await new Promise((r) => setImmediate(r));
  const stale = await e.dispatch('fetch', { request: idx });
  assert.strictEqual(stale.body, 'v2', 'stale copy returned immediately');
  await new Promise((r) => setImmediate(r));
  assert.strictEqual(hits, 3, 'background revalidation happened (1 hashed + 1 first idx + 1 revalidate)');
});
