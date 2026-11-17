/* MyDevOps learner progress in IndexedDB. Framework-independent; no sensitive data, no sync.
 * Exposes window.MyDevOpsProgress (Promise API). Falls back to memory if IndexedDB is unavailable. */
(function (global) {
  'use strict';

  var DB_NAME = 'MyDevOpsDB';
  var DB_VERSION = 1;

  // Migrations: key = version being created. Data is never dropped.
  var MIGRATIONS = {
    1: function (db) {
      db.createObjectStore('lessons', { keyPath: 'lessonId' });
      db.createObjectStore('quizResults', { keyPath: 'quizId' });
      db.createObjectStore('userPreferences', { keyPath: 'key' });
      var bm = db.createObjectStore('bookmarks', { keyPath: 'bookmarkId' });
      bm.createIndex('lessonId', 'lessonId', { unique: false });
    }
  };
  var STORES = ['lessons', 'quizResults', 'userPreferences', 'bookmarks'];

  function upgrade(db, oldVersion, newVersion) {
    for (var v = oldVersion + 1; v <= newVersion; v++) {
      if (MIGRATIONS[v]) MIGRATIONS[v](db);
    }
  }

  // ---------- backends ----------
  var dbPromise = null;
  var memory = null; // used when IndexedDB is unavailable

  function memBackend() {
    if (!memory) { memory = {}; STORES.forEach(function (s) { memory[s] = new Map(); }); }
    var keyPaths = { lessons: 'lessonId', quizResults: 'quizId', userPreferences: 'key', bookmarks: 'bookmarkId' };
    return {
      get: function (s, k) { return Promise.resolve(memory[s].get(k)); },
      getAll: function (s) { return Promise.resolve(Array.from(memory[s].values())); },
      put: function (s, v) { memory[s].set(v[keyPaths[s]], v); return Promise.resolve(v); },
      del: function (s, k) { memory[s].delete(k); return Promise.resolve(); },
      byIndex: function (s, idx, val) {
        return Promise.resolve(Array.from(memory[s].values()).filter(function (r) { return r[idx] === val; }));
      },
      clear: function (s) { memory[s].clear(); return Promise.resolve(); }
    };
  }

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!global.indexedDB) { reject(new Error('IndexedDB unavailable')); return; }

      function attempt(version) {
        var req;
        try { req = version ? global.indexedDB.open(DB_NAME, version) : global.indexedDB.open(DB_NAME); } catch (e) { reject(e); return; }
        req.onupgradeneeded = function (ev) { upgrade(req.result, ev.oldVersion, ev.newVersion || DB_VERSION); };
        req.onblocked = function () { console.warn('MyDevOpsDB upgrade blocked by another open tab'); };
        req.onerror = function (ev) {
          // A stale script (older DB_VERSION) meeting a newer database: open it as-is instead of losing access.
          if (version && req.error && req.error.name === 'VersionError') {
            if (ev && ev.preventDefault) ev.preventDefault();
            attempt(0);
            return;
          }
          reject(req.error || new Error('IndexedDB open failed'));
        };
        req.onsuccess = function () {
          var db = req.result;
          db.onversionchange = function () { db.close(); dbPromise = null; backend = null; };
          db.onclose = function () { dbPromise = null; backend = null; };
          resolve(db);
        };
      }
      attempt(DB_VERSION);
    });
    return dbPromise;
  }

  function tx(store, mode, fn) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t;
        try { t = db.transaction(store, mode); } catch (e) { dbPromise = null; reject(e); return; }
        var result;
        t.oncomplete = function () { resolve(result); };
        t.onerror = function () { reject(t.error || new Error('transaction error')); };
        t.onabort = function () { reject(t.error || new Error('transaction aborted')); }; // incl. QuotaExceededError
        fn(t.objectStore(store), function (v) { result = v; });
      });
    });
  }

  function idbBackend() {
    return {
      get: function (s, k) { return tx(s, 'readonly', function (st, set) { var r = st.get(k); r.onsuccess = function () { set(r.result); }; }); },
      getAll: function (s) { return tx(s, 'readonly', function (st, set) { var r = st.getAll(); r.onsuccess = function () { set(r.result); }; }); },
      put: function (s, v) { return tx(s, 'readwrite', function (st, set) { st.put(v); set(v); }); },
      del: function (s, k) { return tx(s, 'readwrite', function (st) { st['delete'](k); }); },
      byIndex: function (s, idx, val) { return tx(s, 'readonly', function (st, set) { var r = st.index(idx).getAll(val); r.onsuccess = function () { set(r.result); }; }); },
      clear: function (s) { return tx(s, 'readwrite', function (st) { st.clear(); }); }
    };
  }

  var backend = null;
  function be() {
    if (backend) return Promise.resolve(backend);
    return openDb().then(function () { backend = idbBackend(); return backend; }).catch(function (err) {
      console.warn('MyDevOpsProgress: using in-memory fallback (' + (err && err.message) + ')');
      backend = memBackend();
      return backend;
    });
  }
  function use(fn) { return be().then(fn); }
  function nowIso() { return new Date().toISOString(); }

  // ---------- API ----------
  var API = {
    DB_NAME: DB_NAME,
    DB_VERSION: DB_VERSION,

    markLessonComplete: function (lessonId) {
      return use(function (b) { return b.put('lessons', { lessonId: lessonId, completed: true, completedAt: nowIso() }); });
    },
    unmarkLessonComplete: function (lessonId) {
      return use(function (b) { return b.put('lessons', { lessonId: lessonId, completed: false, completedAt: null }); });
    },
    getLesson: function (lessonId) { return use(function (b) { return b.get('lessons', lessonId); }); },
    listLessons: function () { return use(function (b) { return b.getAll('lessons'); }); },

    saveQuizResult: function (quizId, score) {
      return use(function (b) {
        return b.get('quizResults', quizId).then(function (prev) {
          var rec = { quizId: quizId, score: score, attempts: ((prev && prev.attempts) || 0) + 1, lastAttemptAt: nowIso() };
          return b.put('quizResults', rec);
        });
      });
    },
    getQuizResult: function (quizId) { return use(function (b) { return b.get('quizResults', quizId); }); },
    listQuizResults: function () { return use(function (b) { return b.getAll('quizResults'); }); },

    addBookmark: function (lessonId) {
      var rec = { bookmarkId: 'bm:' + lessonId, lessonId: lessonId, createdAt: nowIso() };
      return use(function (b) { return b.put('bookmarks', rec); });
    },
    removeBookmark: function (bookmarkId) { return use(function (b) { return b.del('bookmarks', bookmarkId); }); },
    listBookmarks: function (lessonId) {
      return use(function (b) { return lessonId ? b.byIndex('bookmarks', 'lessonId', lessonId) : b.getAll('bookmarks'); });
    },

    setPreference: function (key, value) { return use(function (b) { return b.put('userPreferences', { key: key, value: value }); }); },
    getPreference: function (key) {
      return use(function (b) { return b.get('userPreferences', key); }).then(function (r) { return r ? r.value : undefined; });
    },

    // Future sync hook: plain JSON, no secrets.
    exportAll: function () {
      return use(function (b) {
        return Promise.all(STORES.map(function (s) { return b.getAll(s); })).then(function (all) {
          var out = { app: 'MyDevOps', dbVersion: DB_VERSION, exportedAt: nowIso(), data: {} };
          STORES.forEach(function (s, i) { out.data[s] = all[i]; });
          return out;
        });
      });
    },
    importAll: function (dump) {
      if (!dump || dump.app !== 'MyDevOps' || !dump.data) return Promise.reject(new Error('invalid export'));
      return use(function (b) {
        var jobs = [];
        STORES.forEach(function (s) { (dump.data[s] || []).forEach(function (rec) { jobs.push(b.put(s, rec)); }); });
        return Promise.all(jobs).then(function () { return jobs.length; });
      });
    }
  };

  global.MyDevOpsProgress = API;
})(window);
