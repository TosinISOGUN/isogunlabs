// Rebuilds public/sitemap.xml from the pages listed below and the posts in src/content/blog.
// Run it with `npm run sitemap` after adding a page or post, then commit the result.
// (The IndexNow step in the deploy workflow reads the committed file.)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const origin = 'https://isogunlabs.com';
const today = new Date().toISOString().slice(0, 10);

// Static pages: [path, priority]. Add new top-level pages here.
const pages = [
  ['/', '1.0'], ['/services/', '0.9'], ['/work/', '0.9'], ['/contact/', '0.8'],
  ['/get-started/', '0.8'], ['/blog/', '0.8'], ['/documentation/', '0.6'], ['/support/', '0.5'],
];

const dir = 'src/content/blog';
const posts = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
  const text = readFileSync(join(dir, f), 'utf8');
  const get = (k) => (text.match(new RegExp('^' + k + ':\\s*"?([^"\\r\\n]+)"?', 'm')) || [])[1];
  return { slug: f.replace(/\.md$/, ''), draft: get('draft') === 'true', date: (get('updatedDate') || get('pubDate') || today).slice(0, 10) };
}).filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));

const latest = posts[0] ? posts[0].date : today;
const url = (loc, lastmod, priority, freq = 'monthly') =>
  `  <url>\n    <loc>${origin}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const [p, pr] of pages) xml += url(p, p === '/blog/' ? latest : today, pr);
for (const p of posts) xml += url('/blog/' + p.slug + '/', p.date, '0.7', 'yearly');
xml += '</urlset>\n';
writeFileSync('public/sitemap.xml', xml);
console.log('sitemap.xml: ' + pages.length + ' pages + ' + posts.length + ' posts');
