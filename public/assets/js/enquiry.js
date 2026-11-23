/* Enquiry form on /contact/.
   If the form has a data-endpoint (a form-service address set in src/data/nav.ts), the brief is sent there and the
   visitor goes to the thank-you page. With no endpoint, the form opens the visitor's own email app with the brief
   filled in, so no enquiry is ever lost while the endpoint is not set up. */
(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('enquiry-status');
  var button = form.querySelector('button[type="submit"]');
  var labels = {
    name: 'Name', email: 'Email', business: 'Business or brand', business_type: 'Type of business', country: 'Based in',
    project_type: 'Needs', timeline: 'Timeline', budget: 'Budget', message: 'About the project'
  };

  function say(text, bad) {
    status.textContent = text;
    status.className = 'enq-status' + (bad ? ' bad' : text ? ' ok' : '');
  }

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function validate() {
    var bad = null;
    ['name', 'email', 'message'].forEach(function (n) {
      var el = form.elements[n];
      var value = (el.value || '').trim();
      var ok = value && (n !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !bad) bad = el;
    });
    return bad;
  }

  function composeMail() {
    var lines = [];
    Object.keys(labels).forEach(function (k) {
      var v = (form.elements[k].value || '').trim();
      if (v) lines.push(labels[k] + ': ' + v);
    });
    var subject = 'New project enquiry from ' + (form.elements.name.value || '').trim();
    return 'mailto:' + form.dataset.mailto + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n\n'));
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements._gotcha && form.elements._gotcha.value) return; // a bot filled the hidden field
    var firstBad = validate();
    if (firstBad) {
      say(form.dataset.mInvalid || 'Please fill in your name, a valid email and a few words about the project.', true);
      firstBad.focus();
      return;
    }
    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      track('generate_lead', { method: 'enquiry_form_email' });
      say((form.dataset.mMail || 'Your email app should open with your brief ready to send. If it does not, write to {email}.').replace('{email}', form.dataset.mailto), false);
      window.location.href = composeMail();
      return;
    }
    button.disabled = true;
    button.classList.add('is-loading'); // the arrow turns into a spinner until the visitor lands on the thank-you page
    button.setAttribute('aria-busy', 'true');
    say(form.dataset.mSending || 'Sending...', false);
    var backup = form.dataset.backup;
    var jobs = [
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) { return res.ok; }, function () { return false; })
    ];
    if (backup) {
      var payload = {};
      Object.keys(labels).forEach(function (k) { payload[k] = form.elements[k].value; });
      jobs.push(
        fetch(backup, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
          .then(function (res) { return res.ok; }, function () { return false; })
      );
    }
    // Sent if either route took it, so one service being down never loses an enquiry.
    Promise.all(jobs)
      .then(function (results) {
        if (!results.some(Boolean)) throw new Error('all routes failed');
        track('generate_lead', { method: 'enquiry_form' });
        window.location.href = form.dataset.thanks || '/contact/thanks/';
      })
      .catch(function () {
        button.disabled = false;
        button.classList.remove('is-loading');
        button.removeAttribute('aria-busy');
        say((form.dataset.mFail || 'Sorry, that did not send. Please email {email} instead.').replace('{email}', form.dataset.mailto), true);
      });
  });

  // coming back with the browser's Back button must not leave the button stuck in its loading state
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { button.disabled = false; button.classList.remove('is-loading'); button.removeAttribute('aria-busy'); }
  });

  form.addEventListener('input', function (e) {
    if (e.target.getAttribute && e.target.getAttribute('aria-invalid') === 'true') e.target.setAttribute('aria-invalid', 'false');
  });
})();
