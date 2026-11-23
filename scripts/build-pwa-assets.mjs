// Builds the installed-app artwork: the app icons (black tile with the hexagon mark), the iPhone/iPad splash images
// (black, mark, wordmark and tagline) and the home-screen icon. Run it after changing the mark, the tagline or the
// device list in src/data/pwa-splash.json, then commit the generated PNGs.
//
//   npm i --no-save puppeteer-core      (any Chrome will do)
//   node scripts/build-pwa-assets.mjs
//
// Optional environment variables: CHROME_PATH (default: Windows Chrome), PUPPETEER_FROM (a package.json path to
// resolve puppeteer-core from, if it is installed elsewhere).
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const require = createRequire(process.env.PUPPETEER_FROM || join(root, 'package.json'));
const puppeteer = require('puppeteer-core');
const sharp = require('sharp');

const TAGLINE = 'Websites and software that ship.';
const ACCENT = '#BDEB4A';
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const b64 = (file) => readFileSync(join(root, file)).toString('base64');
const mark = `data:image/png;base64,${b64('public/assets/icons/mark.png')}`;
const unbounded = `data:font/woff2;base64,${b64('public/assets/fonts/unbounded-latin.woff2')}`;
const geist = `data:font/woff2;base64,${b64('public/assets/fonts/geist-variable.woff2')}`;
const devices = JSON.parse(readFileSync(join(root, 'src/data/pwa-splash.json'), 'utf8'));

const fonts = `
@font-face{font-family:U;src:url(${unbounded}) format('woff2');font-weight:200 900}
@font-face{font-family:G;src:url(${geist}) format('woff2');font-weight:100 900}`;

const iconPage = (size, pct) => `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;width:${size}px;height:${size}px;background:#000;overflow:hidden}
img{position:absolute;left:50%;top:50%;width:${size * pct}px;transform:translate(-50%,-50%)}
</style><img src="${mark}">`;

function splashPage(w, h) {
  const mw = Math.min(w * 0.36, 250);        // mark width
  const f = Math.min(w * 0.082, 38);         // wordmark size
  const f2 = Math.min(w * 0.036, 17);        // tagline size
  return `<!doctype html><meta charset="utf-8"><style>${fonts}
html,body{margin:0;width:${w}px;height:${h}px;background:#000;overflow:hidden}
.stage{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:translateY(-3%)}
img{width:${mw}px;display:block}
.wm{margin-top:${mw * 0.2}px;font:600 ${f}px/1 U;letter-spacing:-.035em;color:#fff;white-space:nowrap}
.wm em{font-style:normal;color:${ACCENT}}
.tag{margin-top:${f * 0.62}px;font:500 ${f2}px/1.3 G;color:rgba(255,255,255,.62);letter-spacing:.01em}
</style><div class="stage"><img src="${mark}"><div class="wm">Isogun <em>Labs</em></div><div class="tag">${TAGLINE}</div></div>`;
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();

async function shoot(html, w, h, dpr, out) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png' });
  await sharp(buf).png({ compressionLevel: 9 }).toFile(join(root, out));
  console.log('wrote', out);
}

mkdirSync(join(root, 'public/assets/splash'), { recursive: true });

// app icons: "any" fills most of the tile, "maskable" stays inside the safe zone so round and squircle masks never cut the mark
await shoot(iconPage(192, 0.74), 192, 192, 1, 'public/assets/icons/icon-192.png');
await shoot(iconPage(512, 0.74), 512, 512, 1, 'public/assets/icons/icon-512.png');
await shoot(iconPage(192, 0.56), 192, 192, 1, 'public/assets/icons/icon-maskable-192.png');
await shoot(iconPage(512, 0.56), 512, 512, 1, 'public/assets/icons/icon-maskable-512.png');
await shoot(iconPage(180, 0.74), 180, 180, 1, 'public/assets/icons/apple-touch-icon.png');

for (const d of devices) {
  await shoot(splashPage(d.w, d.h), d.w, d.h, d.dpr, `public/assets/splash/splash-${d.w * d.dpr}x${d.h * d.dpr}.png`);
}

await browser.close();
