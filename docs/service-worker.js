/* MyDevOps service worker. Lives at the site root; scope = its own directory.
 * Cache names are prefixed "mydevops-" because the github.io origin is shared. */
'use strict';

var VERSION = 'v1';
var PRECACHE = 'mydevops-precache-' + VERSION;
var RUNTIME = 'mydevops-runtime-' + VERSION;
var ROOT = new URL('./', self.location).pathname;

// App shell only. Lessons are cached when visited. Paths are relative to the site root.
var SHELL = [
  'offline.html',
  'manifest.webmanifest',
  'assets/css/academy.css',
  'assets/js/pwa-register.js',
  'assets/js/progress.js',
  'assets/js/app.js',
  'assets/js/theme.js',
  'assets/fonts/roboto/roboto-latin-400-normal.woff2',
  'assets/fonts/roboto/roboto-latin-700-normal.woff2',
  'assets/fonts/roboto-mono/roboto-mono-latin-400-normal.woff2',
  'assets/images/icons/icon-192.png',
  'assets/images/icons/icon-512.png'
];

function shellUrls() {
  return SHELL.map(function (p) { return new URL(p, self.location).href; });
}

function cacheable(res) {
  return res && res.status === 200 && res.type === 'basic';
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(PRECACHE).then(function (cache) { return cache.addAll(shellUrls()); })
  );
  // No skipWaiting here: the page asks for it via SKIP_WAITING.
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k.indexOf('mydevops-') === 0 && k !== PRECACHE && k !== RUNTIME) return caches.delete(k);
        return null;
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isHtml(url) {
  return url.pathname.charAt(url.pathname.length - 1) === '/' || /\.html$/.test(url.pathname);
}
function isHashed(url) {
  return /\.[0-9a-f]{8}\./.test(url.pathname);
}

function put(cacheName, request, response) {
  if (!cacheable(response)) return;
  var copy = response.clone();
  caches.open(cacheName).then(function (c) { c.put(request, copy); });
}

function networkFirstHtml(request) {
  return fetch(request).then(function (res) {
    put(RUNTIME, request, res);
    return res;
  }).catch(function () {
    return caches.match(request).then(function (hit) {
      return hit || caches.match(new URL('offline.html', self.location).href);
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.match(request).then(function (hit) {
    var net = fetch(request).then(function (res) { put(RUNTIME, request, res); return res; }).catch(function () { return hit; });
    return hit || net;
  });
}

function cacheFirst(request) {
  return caches.match(request).then(function (hit) {
    return hit || fetch(request).then(function (res) { put(RUNTIME, request, res); return res; });
  });
}

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;
  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.indexOf(ROOT) !== 0) return;

  if (isHtml(url)) {
    event.respondWith(networkFirstHtml(request));
  } else if (/search\/search_index\.json$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  } else if (isHashed(url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});
