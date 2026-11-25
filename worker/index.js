/* Backup and notification route for the forms on isogunlabs.com.
   It receives three kinds of submission (the "type" field; no type means a project enquiry):
     enquiry      the project brief on /contact/ (the page also sends it to Formspree)
     testimonial  a client review from /testimonial/
     signup       an email address from the free checklist page /checklist/
   Each one is then:
     1. emailed through Resend (delivery logs in the Resend dashboard)
     2. pushed to Telegram (an instant phone notification)
   It answers 200 if at least one of the two worked, so the visitor only sees a failure when both fail.

   Secrets (set with `wrangler secret put`): RESEND_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
   Variables (wrangler.toml): NOTIFY_TO, MAIL_FROM, ALLOWED_ORIGINS */

const KINDS = {
  enquiry: {
    heading: 'New enquiry on isogunlabs.com',
    subject: (d) => `New project enquiry from ${d.name}`,
    required: ['name', 'message'],
    fields: {
      name: 'Name', email: 'Email', business: 'Business or brand', business_type: 'Type of business', country: 'Based in',
      project_type: 'Needs', timeline: 'Timeline', budget: 'Budget', message: 'About the project',
    },
  },
  testimonial: {
    heading: 'New testimonial for isogunlabs.com',
    subject: (d) => `New ${d.rating || '?'}-star testimonial from ${d.name}`,
    required: ['name', 'message', 'rating'],
    fields: {
      name: 'Name', role: 'Role or business', project: 'What we made', rating: 'Rating (out of 5)', message: 'Their words',
      website: 'Website', email: 'Email', permission: 'OK to publish', display: 'How to show their name',
    },
  },
  signup: {
    heading: 'New checklist signup on isogunlabs.com',
    subject: (d) => `Checklist signup: ${d.email}`,
    required: [],
    fields: { name: 'Name', email: 'Email', tips: 'Wants occasional website tips', source: 'From page' },
  },
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function cors(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim());
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0] || '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function reply(request, env, status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(request, env) },
  });
}

async function sendEmail(env, kind, d, lines) {
  if (!env.RESEND_API_KEY) return false;
  const html =
    '<table cellpadding="6" style="font-family:sans-serif;font-size:15px">' +
    lines.map(([k, v]) => `<tr><td valign="top"><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('') +
    '</table>';
  const body = {
    from: env.MAIL_FROM,
    to: (env.NOTIFY_TO || '').split(',').map((s) => s.trim()),
    subject: kind.subject(d),
    html,
    text: lines.map(([k, v]) => `${k}: ${v}`).join('\n\n'),
  };
  if (d.email) body.reply_to = d.email;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error(`resend failed: HTTP ${res.status}`);
  return res.ok;
}

async function sendTelegram(env, kind, d, lines) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false;
  const stars = d.rating ? ` ${'★'.repeat(Number(d.rating) || 0)}${'☆'.repeat(5 - (Number(d.rating) || 0))}` : '';
  const text = `${kind.heading}${stars}\n\n` + lines.map(([k, v]) => `${k}: ${v}`).join('\n').slice(0, 3800);
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
  });
  if (!res.ok) console.error(`telegram failed: HTTP ${res.status}`);
  return res.ok;
}

// Log only the channel and the kind of error, never the submission or a URL (the Telegram URL holds the bot token).
const failed = (channel) => (err) => {
  console.error(`${channel} threw: ${(err && err.name) || 'error'}`);
  return false;
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request, env) });
    if (request.method !== 'POST') return reply(request, env, 405, { ok: false });

    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim());
    if (!allowed.includes(origin)) return reply(request, env, 403, { ok: false });

    let data;
    try {
      data = await request.json();
    } catch {
      return reply(request, env, 400, { ok: false });
    }

    // A bot filled the hidden field: pretend it worked and drop it.
    if (data._gotcha) return reply(request, env, 200, { ok: true });

    const typeName = KINDS[data.type] ? data.type : 'enquiry';
    const kind = KINDS[typeName];

    const d = {};
    for (const k of Object.keys(kind.fields)) d[k] = String(data[k] || '').trim().slice(0, k === 'message' ? 5000 : 300);
    if (d.rating) {
      const n = Math.round(Number(d.rating));
      d.rating = n >= 1 && n <= 5 ? String(n) : '';
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '');
    // Enquiries and checklist signups need a valid email; for testimonials the email is optional.
    if (typeName !== 'testimonial' && !emailOk) return reply(request, env, 400, { ok: false });
    if (typeName === 'testimonial' && d.email && !emailOk) d.email = '';
    if (kind.required.some((k) => !d[k])) return reply(request, env, 400, { ok: false });

    const lines = Object.keys(kind.fields)
      .filter((k) => d[k])
      .map((k) => [kind.fields[k], d[k]]);

    const [mail, tg] = await Promise.all([
      sendEmail(env, kind, d, lines).catch(failed('resend')),
      sendTelegram(env, kind, d, lines).catch(failed('telegram')),
    ]);

    if (!mail || !tg) console.warn(`${typeName} delivery: mail=${mail} telegram=${tg}`);
    return mail || tg ? reply(request, env, 200, { ok: true, mail, telegram: tg }) : reply(request, env, 502, { ok: false });
  },
};
