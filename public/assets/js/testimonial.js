/* Testimonial page (/testimonial/).
   - Personalises the page from the link: /testimonial/?name=Gloria&project=A%20website
   - Fills a live preview card as the client types
   - Sends the review to the Worker (which forwards it to Telegram and email), then shows an animated thank-you */
(function () {
  var form = document.getElementById('tm-form');
  if (!form) return;
  var thanks = document.getElementById('tm-thanks');
  var statusEl = document.getElementById('tm-status');
  var button = form.querySelector('button[type="submit"]');
  var labels = ['', 'Needs work', 'Could be better', 'Good', 'Great', 'Loved it'];
  var q = new URLSearchParams(location.search);
  var el = function (id) { return document.getElementById(id); };

  // ---- personalise from the link
  var given = (q.get('name') || '').trim().slice(0, 60);
  if (given) {
    var first = given.split(/\s+/)[0];
    el('tm-kicker').textContent = 'Hi ' + first + ', a quick favour';
    el('tm-name').value = given;
  }
  var proj = (q.get('project') || '').trim();
  if (proj) {
    var sel = el('tm-project');
    for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].text.toLowerCase() === proj.toLowerCase()) { sel.selectedIndex = i; break; } }
  }
  var role = (q.get('role') || '').trim().slice(0, 80);
  if (role) el('tm-role').value = role;

  // ---- live preview
  function rating() { var c = form.querySelector('input[name="rating"]:checked'); return c ? Number(c.value) : 0; }
  function preview() {
    var n = rating();
    el('tm-prev-stars').textContent = '★★★★★'.slice(0, n || 5) + '☆☆☆☆☆'.slice(0, n ? 5 - n : 0);
    el('tm-prev-stars').className = 'tm-card-stars' + (n ? ' is-set' : '');
    el('tm-rate-label').textContent = n ? labels[n] : 'Tap a star';
    var msg = el('tm-message').value.trim();
    el('tm-prev-quote').textContent = msg || 'Your words will appear here as you type, just like they could on our website.';
    var name = el('tm-name').value.trim();
    var role = el('tm-role').value.trim();
    var mode = el('tm-display').value;
    var shownName = mode === 'Anonymous' ? 'A happy client' : mode === 'First name only' ? (name.split(/\s+/)[0] || 'Your name') : (name || 'Your name');
    el('tm-prev-name').textContent = shownName;
    el('tm-prev-role').textContent = mode === 'Name and role' ? (role || 'Your role or business') : '';
  }
  form.addEventListener('input', preview);
  form.addEventListener('change', preview);
  preview();

  // ---- prompt chips
  form.querySelectorAll('.tm-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var ta = el('tm-message');
      var text = chip.getAttribute('data-prompt').replace(/\?$/, '') + ': ';
      ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '\n\n' + text : text;
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
      preview();
    });
  });

  function say(text, bad) { statusEl.textContent = text; statusEl.className = 'enq-status' + (bad ? ' bad' : text ? ' ok' : ''); }
  function track(name) { if (typeof window.gtag === 'function') window.gtag('event', name, {}); }

  function confetti() {
    var box = el('tm-confetti');
    if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var colours = ['#BDEB4A', '#0D0F0B', '#E8590C', '#1736E0', '#FFD400'];
    for (var i = 0; i < 36; i++) {
      var s = document.createElement('span');
      s.style.left = Math.round(Math.random() * 100) + '%';
      s.style.background = colours[i % colours.length];
      s.style.setProperty('--dx', Math.round((Math.random() - 0.5) * 160) + 'px');
      s.style.setProperty('--rot', Math.round(Math.random() * 720) + 'deg');
      s.style.animationDelay = (Math.random() * 0.5).toFixed(2) + 's';
      s.style.animationDuration = (1.8 + Math.random() * 1.4).toFixed(2) + 's';
      box.appendChild(s);
    }
    setTimeout(function () { box.innerHTML = ''; }, 4200);
  }

  function showThanks(name) {
    var first = (name || '').trim().split(/\s+/)[0];
    el('tm-thanks-h2').textContent = first ? 'Thank you, ' + first + '!' : 'Thank you!';
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus({ preventScroll: true });
    thanks.scrollIntoView({ behavior: 'smooth', block: 'start' });
    confetti();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements._gotcha && form.elements._gotcha.value) return;
    var n = rating();
    var msg = el('tm-message').value.trim();
    var name = el('tm-name').value.trim();
    if (!n) { say('Please tap a star to rate your experience.', true); form.querySelector('.tm-stars').scrollIntoView({ block: 'center' }); return; }
    if (msg.length < 10) { say('Please add a few words about your experience.', true); el('tm-message').focus(); return; }
    if (!name) { say('Please add your name.', true); el('tm-name').focus(); return; }
    if (!el('tm-permission').checked) { say('Please tick the box to let us publish your words.', true); el('tm-permission').focus(); return; }

    var payload = {
      type: 'testimonial', rating: String(n), message: msg, name: name,
      role: form.elements.role.value, project: form.elements.project.value, website: form.elements.website.value,
      email: form.elements.email.value, permission: 'Yes', display: form.elements.display.value
    };
    button.disabled = true; button.classList.add('is-loading'); button.setAttribute('aria-busy', 'true');
    say('Sending...', false);
    fetch(form.dataset.endpoint, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
      .then(function (res) { if (!res.ok) throw new Error('failed'); })
      .then(function () { track('testimonial_submit'); showThanks(name); })
      .catch(function () {
        button.disabled = false; button.classList.remove('is-loading'); button.removeAttribute('aria-busy');
        var body = 'Rating: ' + n + '/5\n\n' + msg + '\n\nName: ' + name;
        var mail = 'mailto:' + form.dataset.mailto + '?subject=' + encodeURIComponent('My review for Isogun Labs') + '&body=' + encodeURIComponent(body);
        say('Sorry, that did not send. Please email it to ' + form.dataset.mailto + ' instead.', true);
        statusEl.insertAdjacentHTML('beforeend', ' <a href="' + mail + '">Open my email</a>');
      });
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { button.disabled = false; button.classList.remove('is-loading'); button.removeAttribute('aria-busy'); }
  });
})();
