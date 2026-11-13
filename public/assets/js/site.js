(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // Header gets a hairline once the page has moved. An observer on a sentinel at the top
  // of the page does this, so there is no scroll listener.
  var header = document.querySelector('.site-header');
  if (header && hasIO) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
    document.body.insertBefore(sentinel, document.body.firstChild);
    new IntersectionObserver(function (e) {
      header.classList.toggle('scrolled', !e[0].isIntersecting);
    }).observe(sentinel);
  }

  // A soft highlight follows the pointer or keyboard focus across the nav links and rests on the current page.
  var links = document.querySelector('.nav-links');
  var blob = links && links.querySelector('.nav-blob');
  if (links && blob) {
    var current = links.querySelector('[aria-current="page"]');
    var moveTo = function (el) {
      if (!el) { blob.classList.remove('on'); return; }
      blob.style.setProperty('--x', el.offsetLeft + 'px');
      blob.style.setProperty('--w', el.offsetWidth + 'px');
      blob.classList.add('on');
    };
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('mouseenter', function () { moveTo(a); });
      a.addEventListener('focus', function () { moveTo(a); });
    });
    links.addEventListener('mouseleave', function () { moveTo(current); });
    links.addEventListener('focusout', function () { moveTo(current); });
    moveTo(current);
    window.addEventListener('resize', function () { moveTo(current); });
  }

  // Full-screen menu on small screens
  var openBtn = document.querySelector('.menu-btn');
  var sheet = document.getElementById('menu-sheet');
  if (openBtn && sheet) {
    var closeBtn = sheet.querySelector('.sheet-close');
    var setOpen = function (open) {
      sheet.classList.toggle('open', open);
      document.body.classList.toggle('sheet-open', open);
      openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { sheet.removeAttribute('inert'); closeBtn.focus(); }
      else { sheet.setAttribute('inert', ''); openBtn.focus({ preventScroll: true }); }
    };
    sheet.setAttribute('inert', '');
    openBtn.addEventListener('click', function () { setOpen(true); });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    sheet.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet.classList.contains('open')) setOpen(false); });
    window.matchMedia('(min-width: 980px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
  }

  // Reveal on scroll
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !hasIO) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Screenshot sliders (Atlassian apps)
  Array.prototype.slice.call(document.querySelectorAll('.shot-slider')).forEach(function (root) {
    var shots = Array.prototype.slice.call(root.querySelectorAll('.shot'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('.shot-dots .dot'));
    if (shots.length < 2) return;
    var interval = parseInt(root.getAttribute('data-interval'), 10) || 4200;
    var i = 0, timer = null;
    var show = function (n) {
      i = (n + shots.length) % shots.length;
      shots.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); d.setAttribute('aria-selected', idx === i ? 'true' : 'false'); });
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () { if (reduce) return; stop(); timer = setInterval(function () { show(i + 1); }, interval); };
    dots.forEach(function (d, idx) { d.addEventListener('click', function () { show(idx); start(); }); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    start();
  });

  // Blog category filter
  var blogFilters = document.querySelector('.blog-filters');
  if (blogFilters) {
    var filterButtons = Array.prototype.slice.call(blogFilters.querySelectorAll('.blog-filter'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.blog-grid .blog-card'));
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
        var filter = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? '' : 'none';
        });
      });
    });
  }

  // Share bar: Instagram has no share URL, so it and "copy link" copy the post address.
  Array.prototype.slice.call(document.querySelectorAll('.share-bar')).forEach(function (bar) {
    var url = bar.getAttribute('data-share-url');
    var toast = bar.querySelector('.share-toast');
    var timer = null;
    var say = function (message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.remove('show'); }, 2400);
    };
    var copy = function (message) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { say(message); }, function () { say(message); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = url; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); say(message);
      }
    };
    var ig = bar.querySelector('[data-share="instagram"]');
    if (ig) ig.addEventListener('click', function () { copy('Link copied. Paste it into your bio or story.'); });
    var cp = bar.querySelector('[data-share="copy"]');
    if (cp) cp.addEventListener('click', function () { copy('Link copied'); });
  });
})();
