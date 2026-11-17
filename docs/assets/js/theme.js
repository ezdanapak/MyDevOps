/* Mirrors Material's colour scheme into IndexedDB userPreferences.theme.
 * Read-only observer: never changes Material's own __palette storage. */
(function () {
  'use strict';
  function save() {
    var P = window.MyDevOpsProgress;
    var scheme = document.body && document.body.getAttribute('data-md-color-scheme');
    if (P && scheme) P.setPreference('theme', scheme).catch(function () {});
  }
  function start() {
    save();
    new MutationObserver(save).observe(document.body, { attributes: true, attributeFilter: ['data-md-color-scheme'] });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
