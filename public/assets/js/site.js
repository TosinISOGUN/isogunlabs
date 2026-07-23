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
})();
