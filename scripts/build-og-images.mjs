// Makes one 1200x630 share image per English page, from the built site in dist/.
//   1. npm run build        (so dist/ has every page and its title)
//   2. node scripts/build-og-images.mjs
// Output: public/assets/og/<key>.png, where key is the page path with slashes turned into dashes
// (/blog/my-post/ becomes blog-my-post.png). Seo.astro uses the matching card when the file exists and
// falls back to the default image otherwise. Translated pages reuse the English card.
// Needs puppeteer-core and sharp: it borrows them from projects/gloria_may_byron/node_modules.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '..');
const studio = path.resolve(site, '..', '..');
const req = createRequire(path.join(studio, 'projects/gloria_may_byron/package.json'));
const puppeteer = req('puppeteer-core');
const sharp = req('sharp');

const dist = path.join(site, 'dist');
const outDir = path.join(site, 'public/assets/og');
fs.mkdirSync(outDir, { recursive: true });

const LOCALES = ['fr', 'es', 'de', 'pt'];
const KICKER = {
  blog: 'From the blog', services: 'Services', work: 'Our work', about: 'About us', contact: 'Contact',
  pricing: 'Packages', 'how-we-work': 'How we work', 'care-plans': 'Care plans', checklist: 'Free checklist',
  terms: 'Terms', privacy: 'Privacy', support: 'Support', documentation: 'Documentation', 'get-started': 'Get started',
};
const DARK = new Set(['blog', 'work', 'checklist']);

const b64 = (f) => fs.readFileSync(path.join(site, f)).toString('base64');
const fonts = `
@font-face{font-family:'Brico';src:url(data:font/woff2;base64,${b64('public/assets/fonts/bricolage-grotesque-latin.woff2')}) format('woff2');font-weight:200 800}
@font-face{font-family:'Geist';src:url(data:font/woff2;base64,${b64('public/assets/fonts/geist-variable.woff2')}) format('woff2');font-weight:100 900}`;
const logo = 'data:image/png;base64,' + (await sharp(path.join(site, 'public/assets/logo-wordmark.webp')).resize({ height: 90 }).png().toBuffer()).toString('base64');

// walk dist for English, indexable pages
const pages = [];
(function walk(dir, rel) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    if (rel === '' && (LOCALES.includes(e.name) || ['_astro', 'assets', 'page'].includes(e.name))) continue;
    if (e.name === 'page') continue;
    const r = rel ? rel + '/' + e.name : e.name;
    const f = path.join(dir, e.name, 'index.html');
    if (fs.existsSync(f)) pages.push({ rel: r, file: f });
    walk(path.join(dir, e.name), r);
  }
})(dist, '');
// terms and privacy are flat files
for (const n of ['terms', 'privacy', 'support']) {
  const f = path.join(dist, n + '.html');
  const g = path.join(dist, n, 'index.html');
  if (!fs.existsSync(g) && fs.existsSync(f)) pages.push({ rel: n, file: f });
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const jobs = [];
for (const p of pages) {
  const html = fs.readFileSync(p.file, 'utf8');
  if (/name="robots" content="[^"]*noindex/.test(html)) continue;
  const m = html.match(/property="og:title" content="([^"]*)"/) || html.match(/<title>([^<]*)<\/title>/);
  if (!m) continue;
  const title = decode(m[1]).replace(/\s*[|\u2013\u2014-]\s*Isogun Labs\s*$/i, '').trim();
  const seg = p.rel.split('/')[0];
  const key = p.rel.replace(/\//g, '-');
  jobs.push({ key, title, kicker: KICKER[seg] || 'Isogun Labs', dark: DARK.has(seg), seg, slug: p.rel.split('/')[1] });
}

function card(j) {
  const dark = j.dark;
  const bg = dark ? '#0D0F0B' : '#BDEB4A';
  const ink = dark ? '#F1F3EC' : '#0D0F0B';
  const sub = dark ? '#A0A596' : '#2a3318';
  const accent = dark ? '#BDEB4A' : '#0D0F0B';
  const shot = j.seg === 'work' && j.slug ? path.join(site, `public/assets/work/${j.slug}/1.webp`) : null;
  const hasShot = shot && fs.existsSync(shot);
  const len = j.title.length;
  const size = hasShot ? (len > 40 ? 52 : 64) : len > 90 ? 52 : len > 60 ? 62 : len > 34 ? 76 : 92;
  return { hasShot, shot, html: `<!doctype html><meta charset="utf-8"><style>${fonts}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:${bg};color:${ink};font-family:'Geist',sans-serif;position:relative;overflow:hidden}
.logo{position:absolute;left:64px;top:56px;background:#000;border-radius:20px;padding:12px 22px;display:flex}
.logo img{height:46px}
.kick{position:absolute;left:64px;top:190px;font-size:24px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${accent}}
.kick:before{content:'';display:inline-block;width:46px;height:5px;background:${accent};margin-right:16px;vertical-align:middle;border-radius:3px}
h1{position:absolute;left:64px;top:246px;width:${hasShot ? 560 : 1050}px;font-family:'Brico',sans-serif;font-weight:800;font-size:${size}px;line-height:1.02;letter-spacing:-.03em}
.url{position:absolute;left:64px;bottom:48px;font-size:26px;font-weight:600;color:${sub}}
.shot{position:absolute;right:56px;top:96px;width:470px;height:438px;border-radius:22px;overflow:hidden;box-shadow:0 30px 60px -20px rgba(0,0,0,.6);border:2px solid #272A22;background:#111}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top left}
.dots{position:absolute;right:64px;bottom:44px;width:72px;height:72px;border-radius:50%;background:${accent};opacity:${dark ? 1 : .9}}
${hasShot ? '.dots{display:none}' : ''}
</style>
<div class="logo"><img src="${logo}"></div>
<div class="kick">${esc(j.kicker)}</div>
<h1>${esc(j.title)}</h1>
<div class="url">isogunlabs.com</div>
${hasShot ? `<div class="shot"><img src="data:image/webp;base64,${fs.readFileSync(shot).toString('base64')}"></div>` : '<div class="dots"></div>'}` };
}

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
const tmp = path.join(process.env.TEMP || '.', 'og-card.html');
let n = 0;

// The testimonial page is noindex, so the walk above skips it. It gets its own hand-made card:
// the link is sent to clients privately, and this is the preview they see in WhatsApp or email.
{
  const star = '<svg viewBox="0 0 24 24" width="86" height="86"><path fill="#BDEB4A" d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.6 6 20.9l1.3-6.7-5-4.7 6.8-.8z"/></svg>';
  const html = `<!doctype html><meta charset="utf-8"><style>${fonts}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0D0F0B;color:#F1F3EC;font-family:'Geist',sans-serif;position:relative;overflow:hidden}
.glow{position:absolute;right:-160px;top:-200px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(189,235,74,.28),rgba(189,235,74,0) 65%)}
.q{position:absolute;right:70px;top:-10px;font-family:'Brico',sans-serif;font-weight:800;font-size:520px;line-height:1;color:#BDEB4A;opacity:.95}
.logo{position:absolute;left:64px;top:56px;background:#000;border:2px solid #272A22;border-radius:20px;padding:12px 22px;display:flex}
.logo img{height:46px}
.stars{position:absolute;left:58px;top:196px;display:flex;gap:6px}
h1{position:absolute;left:64px;top:306px;width:760px;font-family:'Brico',sans-serif;font-weight:800;font-size:104px;line-height:.98;letter-spacing:-.035em}
h1 em{font-style:normal;color:#BDEB4A}
p{position:absolute;left:64px;top:520px;width:700px;font-size:28px;line-height:1.35;color:#A0A596}
.url{position:absolute;right:64px;bottom:46px;font-size:26px;font-weight:600;color:#BDEB4A}
</style>
<div class="glow"></div><div class="q">&ldquo;</div>
<div class="logo"><img src="${logo}"></div>
<div class="stars">${star.repeat(5)}</div>
<h1>How did <em>we do?</em></h1>
<p>Two minutes, in your own words.</p>
<div class="url">isogunlabs.com</div>`;
  fs.writeFileSync(path.join(process.env.TEMP || '.', 'og-card.html'), html);
  await page.goto(pathToFileURL(path.join(process.env.TEMP || '.', 'og-card.html')).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png' });
  await sharp(buf).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(outDir, 'testimonial.png'));
  n++;
}

for (const j of jobs) {
  const c = card(j);
  fs.writeFileSync(tmp, c.html);
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png' });
  await sharp(buf).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(outDir, j.key + '.png'));
  n++;
}
await browser.close();
console.log(`Wrote ${n} share images to public/assets/og/`);
