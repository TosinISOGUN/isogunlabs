/* Free checklist signup (/checklist/): sends the email to the Worker (Telegram + email), then reveals the download. */
(function () {
  var form = document.getElementById('lm-form');
  if (!form) return;
  var statusEl = document.getElementById('lm-status');
  var done = document.getElementById('lm-done');
  var button = form.querySelector('button[type="submit"]');

  function say(text, bad) { statusEl.textContent = text; statusEl.className = 'enq-status' + (bad ? ' bad' : text ? ' ok' : ''); }
  function track(name) { if (typeof window.gtag === 'function') window.gtag('event', name, {}); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements._gotcha && form.elements._gotcha.value) return;
    var email = form.elements.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.elements.email.setAttribute('aria-invalid', 'true');
      say('Please enter a valid email address.', true);
      form.elements.email.focus();
      return;
    }
    form.elements.email.setAttribute('aria-invalid', 'false');
    button.disabled = true; button.classList.add('is-loading'); button.setAttribute('aria-busy', 'true');
    say('Sending...', false);
    var payload = { type: 'signup', email: email, name: form.elements.name.value.trim(), tips: form.elements.tips.checked ? 'Yes' : 'No', source: location.pathname };
    fetch(form.dataset.endpoint, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
      .then(function (res) { if (!res.ok) throw new Error('failed'); })
      .then(function () {
        track('generate_lead');
        track('checklist_signup');
        var first = payload.name.split(/\s+/)[0];
        document.getElementById('lm-done-h2').textContent = first ? 'Thank you, ' + first + '. Your checklist is ready' : 'Your checklist is ready';
        form.hidden = true;
        done.hidden = false;
        done.focus({ preventScroll: true });
      })
      .catch(function () {
        button.disabled = false; button.classList.remove('is-loading'); button.removeAttribute('aria-busy');
        say('Sorry, that did not send. Please try again, or email ' + form.dataset.mailto + ' and we will send it to you.', true);
      });
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { button.disabled = false; button.classList.remove('is-loading'); button.removeAttribute('aria-busy'); }
  });
})();
