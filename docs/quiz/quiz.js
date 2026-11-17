/* DevOps Quiz engine. Question: [text, [options], correctIndex, explanation] */
(function () {
  var KEY = "mydevops-quiz-best";
  function best() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function save(id, pct) { try { var b = best(); if (!(b[id] >= pct)) { b[id] = pct; localStorage.setItem(KEY, JSON.stringify(b)); } } catch (e) {} }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`([^`]+)`/g, "<code>$1</code>"); }

  function home(root) {
    root.innerHTML = "";
    var b = best();
    var grid = el("div", "dq-grid");
    (window.QUIZ_SUBJECTS || []).forEach(function (s) {
      var c = el("div", "dq-card");
      var pct = b[s.id];
      c.innerHTML = (pct != null ? '<span class="dq-badge">' + pct + '%</span>' : "") +
        '<div style="font-size:1.6rem">' + s.icon + "</div><h3>" + esc(s.title) + "</h3><small>" + esc(s.desc) + " · " + s.questions.length + " კითხვა</small>";
      c.onclick = function () { run(root, s, shuffle(s.questions)); };
      grid.appendChild(c);
    });
    var all = [];
    (window.QUIZ_SUBJECTS || []).forEach(function (s) { all = all.concat(s.questions); });
    var mix = el("div", "dq-card");
    mix.innerHTML = '<div style="font-size:1.6rem">🎲</div><h3>შერეული ტესტი</h3><small>20 შემთხვევითი კითხვა ყველა თემიდან</small>';
    mix.onclick = function () { run(root, { id: "mix", title: "შერეული ტესტი" }, shuffle(all).slice(0, 20)); };
    grid.appendChild(mix);
    root.appendChild(grid);
  }

  function run(root, subj, qs) {
    var i = 0, score = 0, wrong = [];
    function show() {
      root.innerHTML = "";
      var q = qs[i];
      var order = shuffle(q[1].map(function (_, k) { return k; }));
      root.appendChild(el("div", "", "<b>" + esc(subj.title) + "</b> · " + (i + 1) + " / " + qs.length));
      var bar = el("div", "dq-bar", "<i style='width:" + (i / qs.length * 100) + "%'></i>");
      root.appendChild(bar);
      root.appendChild(el("div", "dq-q", esc(q[0])));
      var done = false, box = el("div");
      order.forEach(function (k) {
        var o = el("button", "dq-opt", esc(q[1][k]));
        o.onclick = function () {
          if (done) return; done = true;
          [].forEach.call(box.children, function (x) { x.disabled = true; });
          var good = k === q[2];
          o.classList.add(good ? "ok" : "bad");
          if (!good) { [].forEach.call(box.children, function (x, idx) { if (order[idx] === q[2]) x.classList.add("ok"); }); wrong.push(q); } else score++;
          if (q[3]) root.appendChild(el("div", "dq-exp", (good ? "✅ სწორია. " : "❌ არასწორია. ") + esc(q[3])));
          else root.appendChild(el("div", "dq-exp", good ? "✅ სწორია." : "❌ არასწორია."));
          var n = el("button", "dq-btn", i + 1 < qs.length ? "შემდეგი →" : "შედეგი");
          n.onclick = function () { i++; i < qs.length ? show() : finish(); };
          root.appendChild(n);
        };
        box.appendChild(o);
      });
      root.appendChild(box);
    }
    function finish() {
      var pct = Math.round(score / qs.length * 100);
      save(subj.id, pct);
      root.innerHTML = "";
      root.appendChild(el("div", "dq-score", pct + "% (" + score + " / " + qs.length + ")"));
      root.appendChild(el("p", "", pct >= 80 ? "🎉 შესანიშნავია!" : pct >= 50 ? "👍 კარგია, გაიმეორე შეცდომები." : "📚 გადახედე შესაბამის გვერდებს და სცადე ისევ."));
      var again = el("button", "dq-btn", "თავიდან");
      again.onclick = function () { run(root, subj, shuffle(qs)); };
      root.appendChild(again);
      if (wrong.length) {
        var w = el("button", "dq-btn sec", "მხოლოდ შეცდომები (" + wrong.length + ")");
        w.onclick = function () { run(root, subj, shuffle(wrong)); };
        root.appendChild(w);
      }
      var h = el("button", "dq-btn sec", "თემების სია");
      h.onclick = function () { home(root); };
      root.appendChild(h);
      if (wrong.length) {
        root.appendChild(el("h3", "", "შეცდომები"));
        wrong.forEach(function (q) { root.appendChild(el("div", "dq-rev", "<b>" + esc(q[0]) + "</b><br>✔ " + esc(q[1][q[2]]) + (q[3] ? "<br><small>" + esc(q[3]) + "</small>" : ""))); });
      }
    }
    show();
  }

  function init() {
    var root = document.getElementById("quiz-app");
    if (root) home(root);
  }
  if (window.document$) window.document$.subscribe(init); else document.addEventListener("DOMContentLoaded", init);
})();
