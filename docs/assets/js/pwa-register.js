/* Registers the service worker and shows an accessible "update available" prompt. */
(function () {
  'use strict';
  if (!('serviceWorker' in navigator)) return;

  var src = document.currentScript && document.currentScript.src;
  if (!src) return;
  var root = new URL('../../', src); // site root, derived from this script's URL
  var reloading = false;

  function promptUpdate(worker) {
    if (document.querySelector('.pwa-update')) return;
    var box = document.createElement('div');
    box.className = 'pwa-update';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    var msg = document.createElement('span');
    msg.textContent = 'ხელმისაწვდომია საიტის ახალი ვერსია.';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'განახლება';
    btn.addEventListener('click', function () { worker.postMessage({ type: 'SKIP_WAITING' }); });
    box.appendChild(msg);
    box.appendChild(btn);
    document.body.appendChild(box);
  }

  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });

  window.addEventListener('load', function () {
    navigator.serviceWorker.register(new URL('service-worker.js', root).href, { scope: root.href })
      .then(function (reg) {
        if (reg.waiting && navigator.serviceWorker.controller) promptUpdate(reg.waiting);
        reg.addEventListener('updatefound', function () {
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', function () {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) promptUpdate(nw);
          });
        });
      })
      .catch(function (err) { console.warn('MyDevOps SW registration failed:', err); });
  });
})();
