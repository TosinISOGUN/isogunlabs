(function () {
  // Nav shadow/shrink on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile hamburger drawer
  var burger = document.querySelector('.hamburger');
  var overlay = document.querySelector('.drawer-overlay');
  var drawer = document.querySelector('.drawer');
  if (burger && overlay && drawer) {
    var closeBtn = drawer.querySelector('.d-close');
    var setOpen = function (open) {
      burger.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      document.body.classList.toggle('drawer-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () { setOpen(!drawer.classList.contains('open')); });
    overlay.addEventListener('click', function () { setOpen(false); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Typewriter effect for the homepage hero headline.
  // The full text also lives in the HTML (for SEO / no-JS); we clear and retype it.
  var h1 = document.getElementById('hero-h1');
  if (h1 && !reduce) {
    var tokens = [
      { t: 'We build ' },
      { t: 'focused apps', c: 'amber' },
      { t: ' for the tools your team already uses.' }
    ];
    h1.style.minHeight = h1.offsetHeight + 'px'; // reserve space, avoid reflow
    h1.textContent = '';
    h1.classList.add('typing');
    var ti = 0, ci = 0, cur = null;
    var step = function () {
      if (ti >= tokens.length) { h1.classList.remove('typing'); return; }
      var tok = tokens[ti];
      if (ci === 0) {
        if (tok.c) { cur = document.createElement('span'); cur.className = tok.c; h1.appendChild(cur); }
        else { cur = null; }
      }
      (cur || h1).appendChild(document.createTextNode(tok.t.charAt(ci)));
      ci++;
      if (ci >= tok.t.length) { ti++; ci = 0; }
      setTimeout(step, 45);
    };
    setTimeout(step, 350);
  }

  // Reveal-on-scroll
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    // threshold:0 (fire on any intersection) rather than a fixed area %:
    // a fixed 0.1 never fires for elements taller than ~10x the viewport
    // (a long post on a narrow mobile column), leaving them stuck at
    // opacity:0. rootMargin trims the viewport bottom so the reveal still
    // triggers a moment after the element enters, for all element sizes.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Count-up stats. Any element with [data-count] animates its leading number
  // from 0 when it scrolls into view, preserving prefix/suffix (e.g. "100%").
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    var runCount = function (el) {
      var raw = el.getAttribute('data-count-raw') || el.textContent.trim();
      el.setAttribute('data-count-raw', raw);
      var m = raw.match(/-?\d[\d,]*\.?\d*/);
      if (!m) return;
      var numStr = m[0];
      var target = parseFloat(numStr.replace(/,/g, ''));
      var decimals = (numStr.split('.')[1] || '').length;
      var pre = raw.slice(0, m.index);
      var post = raw.slice(m.index + numStr.length);
      if (reduce) { el.textContent = raw; return; }
      var dur = 1600, start = null;
      var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
      var frame = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = pre + (target * ease(p)).toFixed(decimals) + post;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = raw;
      };
      el.textContent = pre + (0).toFixed(decimals) + post;
      requestAnimationFrame(frame);
    };
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  // Auto-transitioning product screenshot sliders (ScreenshotSlider.astro).
  // Reused across every product showcase — Recap today, future apps later.
  var sliders = Array.prototype.slice.call(document.querySelectorAll('.shot-slider'));
  sliders.forEach(function (root) {
    var shots = Array.prototype.slice.call(root.querySelectorAll('.shot'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('.shot-dots .dot'));
    if (shots.length < 2) return;
    var interval = parseInt(root.getAttribute('data-interval'), 10) || 4200;
    var i = 0, timer = null;
    var show = function (n) {
      i = (n + shots.length) % shots.length;
      shots.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
      dots.forEach(function (d, idx) {
        d.classList.toggle('active', idx === i);
        d.setAttribute('aria-selected', idx === i ? 'true' : 'false');
      });
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () {
      if (reduce) return;
      stop();
      timer = setInterval(function () { show(i + 1); }, interval);
    };
    dots.forEach(function (d, idx) {
      d.addEventListener('click', function () { show(idx); start(); });
    });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    start();
  });

  // Share bar (ShareBar.astro). X/LinkedIn are plain links; Instagram has no
  // URL-based share intent and the plain "copy link" button both just copy
  // the post URL and show a short confirmation in place.
  var shareBars = Array.prototype.slice.call(document.querySelectorAll('.share-bar'));
  shareBars.forEach(function (bar) {
    var url = bar.getAttribute('data-share-url');
    var toast = bar.querySelector('.share-toast');
    var toastTimer = null;
    var copyLink = function (message) {
      var done = function () {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    };
    var igBtn = bar.querySelector('[data-share="instagram"]');
    if (igBtn) igBtn.addEventListener('click', function () { copyLink('Link copied — paste it into your bio or story'); });
    var copyBtn = bar.querySelector('[data-share="copy"]');
    if (copyBtn) copyBtn.addEventListener('click', function () { copyLink('Link copied'); });
  });
})();
