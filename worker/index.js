/* Backup route for the enquiry form on isogunlabs.com.
   Receives the same enquiry the page sends to Formspree, then:
     1. emails it through Resend (delivery logs in the Resend dashboard)
     2. pushes it to Telegram (an instant phone notification)
   It answers 200 if at least one of the two worked, so the visitor only sees a failure when both fail.

   Secrets (set with `wrangler secret put`): RESEND_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
   Variables (wrangler.toml): NOTIFY_TO, MAIL_FROM, ALLOWED_ORIGINS */

const FIELDS = {
  name: 'Name',
  email: 'Email',
  business: 'Business or brand',
  business_type: 'Type of business',
  country: 'Based in',
  project_type: 'Needs',
  timeline: 'Timeline',
  budget: 'Budget',
  message: 'About the project',
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

async function sendEmail(env, d, lines) {
  if (!env.RESEND_API_KEY) return false;
  const html =
    '<table cellpadding="6" style="font-family:sans-serif;font-size:15px">' +
    lines.map(([k, v]) => `<tr><td valign="top"><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('') +
    '</table>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: (env.NOTIFY_TO || '').split(',').map((s) => s.trim()),
      reply_to: d.email,
      subject: `New project enquiry from ${d.name}`,
      html,
      text: lines.map(([k, v]) => `${k}: ${v}`).join('\n\n'),
    }),
  });
  return res.ok;
}

async function sendTelegram(env, lines) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false;
  const text = 'New enquiry on isogunlabs.com\n\n' + lines.map(([k, v]) => `${k}: ${v}`).join('\n').slice(0, 3800);
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
  });
  return res.ok;
}

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

    const d = {};
    for (const k of Object.keys(FIELDS)) d[k] = String(data[k] || '').trim().slice(0, k === 'message' ? 5000 : 300);
    if (!d.name || !d.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return reply(request, env, 400, { ok: false });

    const lines = Object.keys(FIELDS)
      .filter((k) => d[k])
      .map((k) => [FIELDS[k], d[k]]);

    const [mail, tg] = await Promise.all([
      sendEmail(env, d, lines).catch(() => false),
      sendTelegram(env, lines).catch(() => false),
    ]);

    return mail || tg ? reply(request, env, 200, { ok: true, mail, telegram: tg }) : reply(request, env, 502, { ok: false });
  },
};
