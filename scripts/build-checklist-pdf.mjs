// Builds the free download for /checklist/: a branded two-page PDF and a preview image of its first page.
//   PUPPETEER_FROM="<path to a package.json that has puppeteer-core and sharp>" node scripts/build-checklist-pdf.mjs
// Output: public/assets/downloads/website-brief-checklist.pdf and checklist-preview.webp
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const require = createRequire(process.env.PUPPETEER_FROM || join(root, 'package.json'));
const puppeteer = require('puppeteer-core');
const sharp = require('sharp');
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const b64 = (f) => readFileSync(join(root, f)).toString('base64');
const mark = `data:image/png;base64,${b64('public/assets/icons/mark.png')}`;
const font = (n, f) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('public/assets/fonts/' + f)}) format('woff2');font-weight:100 900}`;
const LIME = '#BDEB4A';

const items = [
  ['Know what the site is for', 'Write one sentence: "I want people who find us on Google to contact us about X." Everything else supports it.'],
  ['List the pages you need', 'Home, Services, About and Contact is a typical start. Mark each page "must have" or "later".'],
  ['Prepare your words', 'Rough notes in your own voice beat a blank page. Add the questions customers ask you most.'],
  ['Gather your photos and logo', 'Recent, well-lit photos of your work, premises and team, plus your logo as a clean, large file.'],
  ['Sort out your domain', 'Find out who owns it and who holds the login. Make sure it is registered in your business name.'],
  ['Pick one decision-maker', 'One person has the final say and sends feedback as a single list.'],
  ['Collect examples', 'Send three websites you like and one you do not, and say why.'],
  ['Agree money and time', 'Total cost, what is not included, when payments are due, the timeline and who owns the finished site.'],
];
const questions = [
  'Who will actually build my site, and who will I talk to?',
  'What exactly is included, in writing?',
  'Who owns the domain, the hosting account and the code?',
  'How fast will the finished site load on a phone?',
  'What happens after launch, and what does it cost?',
];

const page = (n, body) => `<section class="pg"><div class="bar"><img src="${mark}"><b>Isogun Labs</b><span>Websites and software that ship.</span></div>${body}<footer><span>isogunlabs.com</span><span>support@isogunlabs.com</span><span>${n} / 2</span></footer></section>`;
const html = `<!doctype html><meta charset="utf-8"><style>
${font('U', 'unbounded-latin.woff2')}${font('G', 'geist-variable.woff2')}
@page{size:A4;margin:0}*{box-sizing:border-box;margin:0;padding:0}
body{font-family:G,sans-serif;color:#0D0F0B;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{position:relative;width:210mm;height:297mm;padding:16mm 16mm 22mm;overflow:hidden;page-break-after:always;background:#F7F8F2}
.bar{display:flex;align-items:center;gap:10px;margin-bottom:14mm}.bar img{height:30px}.bar b{font:600 15px U}.bar span{margin-left:auto;font-size:12px;color:#5b6055}
.tag{display:inline-block;background:${LIME};font:700 11px U;letter-spacing:.1em;text-transform:uppercase;padding:7px 14px;border-radius:99px}
h1{font:800 40px/1 U;letter-spacing:-.04em;margin:14px 0 12px}h1 em{font-style:normal;background:${LIME};padding:0 8px;border-radius:10px}
.lead{font-size:15px;line-height:1.5;color:#3d4238;max-width:150mm}
h2{font:700 20px/1.1 U;letter-spacing:-.03em;margin:11mm 0 5mm}
.item{display:flex;gap:12px;padding:9px 0;border-top:1px solid #D9DCCF}.box{flex:none;width:20px;height:20px;border:2px solid #0D0F0B;border-radius:6px;margin-top:2px}
.item b{display:block;font-size:14.5px;margin-bottom:2px}.item p{font-size:12.6px;line-height:1.45;color:#444a3f}
.item .n{margin-left:auto;flex:none;font:700 11px U;color:#8a8f80}
.note{margin-top:7mm;padding:10px 14px;border-radius:14px;background:#fff;border:1px solid #D9DCCF;font-size:12.5px;color:#444a3f}
.q{display:flex;gap:12px;align-items:center;padding:11px 14px;margin-bottom:8px;border-radius:14px;background:#fff;border:1px solid #D9DCCF;font:600 14px/1.3 G}
.q i{flex:none;width:26px;height:26px;border-radius:50%;background:#0D0F0B;color:${LIME};font:700 12px/26px U;text-align:center;font-style:normal}
.tpl{padding:16px 18px;border-radius:16px;background:#0D0F0B;color:#F1F3EC;font-size:14px;line-height:1.6}.tpl b{color:${LIME}}
.cta{margin-top:9mm;padding:16px 18px;border-radius:16px;background:${LIME};font-size:14px;line-height:1.5}.cta b{font:700 15px U;display:block;margin-bottom:4px}
footer{position:absolute;left:16mm;right:16mm;bottom:10mm;display:flex;justify-content:space-between;font-size:11px;color:#6a6f62}
</style>
${page(1, `<span class="tag">Free checklist</span><h1>What to have ready before you hire a <em>web designer</em></h1><p class="lead">Website projects run late for one reason more than any other: something was not ready. Tick these off before you contact anyone, and every conversation after gets faster and cheaper.</p>
<h2>Eight things to sort out first</h2>${items.map(([t, d], i) => `<div class="item"><span class="box"></span><div><b>${t}</b><p>${d}</p></div><span class="n">${String(i + 1).padStart(2, '0')}</span></div>`).join('')}
<div class="note">You do not need all of them to begin. Every one you have ready is a conversation you will not have to have halfway through the project.</div>`)}
${page(2, `<span class="tag">Before you sign</span><h1>Five questions to ask <em>every studio</em></h1><p class="lead">The same questions, asked of everyone you speak to, tell you more than any sales page. A good studio answers them easily and in writing.</p>
<h2>Ask them these</h2>${questions.map((q, i) => `<div class="q"><i>${i + 1}</i>${q}</div>`).join('')}
<h2>Your one-sentence brief</h2><div class="tpl">I want <b>[who you want to reach]</b> who find us on <b>[Google, Instagram, a referral]</b> to <b>[call, book, buy or enquire]</b>.<br><br>Our top three pages are <b>[ ], [ ], [ ]</b>. We would like to launch by <b>[ date ]</b>.</div>
<div class="cta"><b>Want a second pair of eyes on your brief?</b>Book a free 20-minute call at isogunlabs.com and we will help you turn this into a written plan, a timeline and a price.</div>`)}`;

mkdirSync(join(root, 'public/assets/downloads'), { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const p = await browser.newPage();
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: join(root, 'public/assets/downloads/website-brief-checklist.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
// a preview image of page 1
await p.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
const shot = await p.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 794, height: 1123 } });
await sharp(shot).resize(720).webp({ quality: 84 }).toFile(join(root, 'public/assets/downloads/checklist-preview.webp'));
await browser.close();
console.log('checklist PDF and preview written');
