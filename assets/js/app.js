/* MyDevOps Academy UI: lesson controls and progress. Uses window.MyDevOpsProgress. */
(function () {
  'use strict';
  var src = document.currentScript && document.currentScript.src;
  var ROOT = src ? new URL('../../', src).pathname : '/';

  function lessonIdFromPath(path) {
    // /<root>/academy/linux/fundamentals/  ->  linux/fundamentals
    if (path.indexOf(ROOT + 'academy/') !== 0) return null;
    var rest = path.slice((ROOT + 'academy/').length).replace(/\/+$/, '').replace(/\.html$/, '');
    if (!rest || /(^|\/)index$/.test(rest)) return null; // index pages are not lessons
    if (rest.indexOf('/') === -1) return null;            // academy/<x>/ with no lesson segment
    return rest;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function lessonControls() {
    var P = window.MyDevOpsProgress;
    var id = lessonIdFromPath(location.pathname);
    var old = document.querySelector('.lesson-meta');
    if (old) old.remove();
    if (!P || !id) return;
    var h1 = document.querySelector('.md-content h1');
    if (!h1) return;

    var box = el('div', 'lesson-meta');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'გაკვეთილის პროგრესი');
    var done = el('button', null, 'მონიშნე დასრულებულად');
    done.type = 'button';
    var bm = el('button', null, '☆ სანიშნე');
    bm.type = 'button';
    var status = el('span', 'lesson-status');
    status.setAttribute('aria-live', 'polite');
    box.appendChild(done); box.appendChild(bm); box.appendChild(status);
    h1.insertAdjacentElement('afterend', box);

    function paint(lesson, bookmarked) {
      var c = !!(lesson && lesson.completed);
      done.setAttribute('aria-pressed', String(c));
      done.textContent = c ? '✓ დასრულებულია' : 'მონიშნე დასრულებულად';
      bm.setAttribute('aria-pressed', String(bookmarked));
      bm.textContent = bookmarked ? '★ სანიშნეშია' : '☆ სანიშნე';
      status.textContent = c && lesson.completedAt ? 'დასრულდა: ' + new Date(lesson.completedAt).toLocaleDateString('ka') : '';
    }
    function refresh() {
      return Promise.all([P.getLesson(id), P.listBookmarks(id)]).then(function (r) { paint(r[0], r[1].length > 0); })
        .catch(function () { status.textContent = 'პროგრესის შენახვა მიუწვდომელია'; });
    }
    done.addEventListener('click', function () {
      P.getLesson(id).then(function (l) { return l && l.completed ? P.unmarkLessonComplete(id) : P.markLessonComplete(id); })
        .then(refresh).catch(function (e) { status.textContent = 'შეცდომა: ' + (e && e.name || 'unknown'); });
    });
    bm.addEventListener('click', function () {
      P.listBookmarks(id).then(function (l) { return l.length ? P.removeBookmark('bm:' + id) : P.addBookmark(id); })
        .then(refresh).catch(function (e) { status.textContent = 'შეცდომა: ' + (e && e.name || 'unknown'); });
    });
    refresh();
  }

  function academyProgress() {
    var P = window.MyDevOpsProgress;
    var box = document.querySelector('.academy-progress[data-lessons]');
    if (!P || !box) return;
    var ids = box.getAttribute('data-lessons').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    P.listLessons().then(function (all) {
      var done = {};
      all.forEach(function (l) { if (l.completed) done[l.lessonId] = true; });
      var n = ids.filter(function (i) { return done[i]; }).length;
      box.textContent = '';
      var strong = el('strong', null, 'თქვენი პროგრესი: ');
      box.appendChild(strong);
      box.appendChild(document.createTextNode(n + ' / ' + ids.length + ' გაკვეთილი დასრულებულია'));
      var bar = el('div', 'bar');
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', String(ids.length));
      bar.setAttribute('aria-valuenow', String(n));
      var fill = document.createElement('i');
      fill.style.width = (ids.length ? Math.round(n / ids.length * 100) : 0) + '%';
      bar.appendChild(fill);
      box.appendChild(bar);
    }).catch(function () { /* keep the static fallback text */ });
  }

  function init() { lessonControls(); academyProgress(); }

  if (window.document$ && window.document$.subscribe) window.document$.subscribe(init);
  else document.addEventListener('DOMContentLoaded', init);
})();
