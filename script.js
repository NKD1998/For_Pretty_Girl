/* Happy Birthday, Aalooo — interaction logic */
(function () {
  'use strict';

  var PHOTOS = ['assets/couple-photo.jpg', 'assets/couple-photo-2.jpg'];

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var screens = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  var veil = document.getElementById('veil');
  var busy = false;
  var current = 1;
  var seenEnd = false;
  var back = document.getElementById('back');

  /* ── screen transitions ─────────────────────────────── */

  function show(n) {
    if (n === 4) seenEnd = true;
    screens.forEach(function (s) {
      var on = Number(s.dataset.screen) === n;
      s.hidden = !on;
      if (on) { s.scrollTop = 0; restart(s); }
    });
    current = n;
    back.hidden = !(seenEnd && n > 1);
    if (n === 3) PHOTOS.forEach(function (src) { var i = new Image(); i.src = src; });
  }

  /* re-trigger entrance animations on a freshly shown screen */
  function restart(el) {
    el.querySelectorAll('[style*="--d"]').forEach(function (n) {
      n.style.animation = 'none';
      void n.offsetWidth;
      n.style.animation = '';
    });
  }

  function go(n) {
    if (busy || n === current || n < 1 || n > 4) return;
    if (reduce) { show(n); return; }
    busy = true;
    veil.classList.add('pass');
    setTimeout(function () { show(n); }, 400);
    setTimeout(function () { veil.classList.remove('pass'); busy = false; }, 900);
  }

  document.querySelectorAll('[data-next]').forEach(function (btn) {
    btn.addEventListener('click', function () { go(Number(btn.dataset.next)); });
  });

  back.addEventListener('click', function () { go(current - 1); });

  /* ── photo reveal + swap ────────────────────────────── */

  var pre = document.getElementById('preReveal');
  var post = document.getElementById('postReveal');
  var frame = document.getElementById('frame');
  var photo = document.getElementById('photo');
  var index = 0;

  document.getElementById('revealBtn').addEventListener('click', function () {
    pre.hidden = true;
    post.hidden = false;
    restart(post);
  });

  function swap() {
    index = (index + 1) % PHOTOS.length;
    photo.classList.add('swapping');
    setTimeout(function () {
      photo.src = PHOTOS[index];
      photo.classList.remove('swapping');
    }, reduce ? 0 : 260);
  }
  frame.addEventListener('click', swap);
  frame.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); swap(); }
  });

  document.getElementById('restart').addEventListener('click', function () {
    pre.hidden = false;
    post.hidden = true;
    index = 0;
    photo.src = PHOTOS[0];
    go(1);
  });

  /* ── ambient dust + drifting hearts ─────────────────── */

  if (!reduce) {
    var wrap = document.getElementById('dust');
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 14; i++) {
      var d = document.createElement('i');
      var size = 2.5 + Math.random() * 4;
      d.style.left = (Math.random() * 100).toFixed(2) + '%';
      d.style.width = d.style.height = size.toFixed(1) + 'px';
      d.style.background = Math.random() > 0.45
        ? 'rgba(184,144,90,' + (0.3 + Math.random() * 0.4).toFixed(2) + ')'
        : 'rgba(201,143,134,' + (0.3 + Math.random() * 0.4).toFixed(2) + ')';
      d.style.animationDuration = (16 + Math.random() * 20).toFixed(1) + 's';
      d.style.animationDelay = (-Math.random() * 30).toFixed(1) + 's';
      frag.appendChild(d);
    }

    var PETALS = ['🌸', '💜', '🌸', '🌸', '💜'];
    for (var h = 0; h < 34; h++) {
      var e = document.createElement('b');
      e.textContent = PETALS[h % PETALS.length];
      e.style.left = (1 + Math.random() * 97).toFixed(2) + '%';
      e.style.fontSize = (13 + Math.random() * 14).toFixed(1) + 'px';
      e.style.opacity = (0.4 + Math.random() * 0.3).toFixed(2);
      e.style.animationDuration = (24 + Math.random() * 26).toFixed(1) + 's';
      e.style.animationDelay = (-Math.random() * 50).toFixed(1) + 's';
      frag.appendChild(e);
    }

    wrap.appendChild(frag);
  }

  /* ── background music (no controls, starts on her first tap) ── */

  var audio = window.__bdaySong || (window.__bdaySong = new Audio('assets/song.mp3'));
  var fade;

  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;
  audio.setAttribute('playsinline', '');

  function fadeIn() {
    clearInterval(fade);
    fade = setInterval(function () {
      audio.volume = Math.min(0.42, audio.volume + 0.025);
      if (audio.volume >= 0.415) clearInterval(fade);
    }, 55);
  }

  /* Browsers block audio until she interacts, so her first tap starts it. */
  function startAudio() {
    if (!audio.paused) return;
    var p = audio.play();
    if (p && p.then) { p.then(fadeIn).catch(function () {}); } else { fadeIn(); }
  }

  ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, startAudio, { passive: true });
  });
  startAudio();

  /* ── start clean on refresh ─────────────────────────── */
  show(1);
})();
