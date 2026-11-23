/* Cookie choice. Google Analytics runs by default. A visitor can switch it off with Decline (or the close button): that
   stops it, removes its cookies and is remembered for a year, then we ask again. Accept keeps it on and is remembered
   too. The choice is kept in this browser's local storage (not a cookie). The "Cookie settings" links in the footer and
   on /privacy/ reopen the card so a choice can be changed any time. */
(function () {
  var GA_ID = 'G-P9H728QMW5';
  var KEY = 'isogun-consent';
  var YEAR = 365 * 24 * 60 * 60 * 1000;
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && (v.s === 'granted' || v.s === 'denied') && Date.now() - v.t < YEAR) return v.s;
    } catch (e) {}
    return null;
  }
  function write(s) {
    try { localStorage.setItem(KEY, JSON.stringify({ s: s, t: Date.now() })); } catch (e) {}
  }

  function loadAnalytics() {
    window['ga-disable-' + GA_ID] = false;
    window.__gaOn = true; // lets the gtag() calls in the page scripts start reporting
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function stopAnalytics() {
    window['ga-disable-' + GA_ID] = true; // Google's own switch: nothing more is sent
    window.__gaOn = false;
    // remove the two cookies if an earlier "Accept" set them
    var names = ['_ga', '_ga_' + GA_ID.replace('G-', '')];
    var host = location.hostname.split('.');
    var domains = ['', location.hostname, '.' + location.hostname];
    if (host.length > 2) domains.push('.' + host.slice(-2).join('.'));
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function apply(choice) { if (choice === 'granted') loadAnalytics(); else stopAnalytics(); }

  function open() {
    banner.hidden = false;
    var first = banner.querySelector('.cookie-actions button');
    if (first && document.activeElement && document.activeElement.hasAttribute('data-cookie-settings')) first.focus();
  }
  function close() { banner.hidden = true; }

  banner.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-consent]') : null;
    if (!b) return;
    var choice = b.getAttribute('data-consent');
    write(choice);
    apply(choice);
    close();
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
    if (b) { e.preventDefault(); open(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !banner.hidden && read()) close(); // only dismissible this way once a choice exists
  });

  var saved = read();
  if (saved === 'denied') stopAnalytics(); else loadAnalytics(); // on unless the visitor declined
  if (!saved) open(); // first visit: show the card
})();
