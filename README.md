# isogunlabs.com

The Isogun Labs studio website — built with [Astro](https://astro.build), deployed to
GitHub Pages at the custom domain `isogunlabs.com`.

## Structure

- `src/layouts/BaseLayout.astro` — shared `<head>` (meta/SEO/analytics/icons), nav, mobile
  drawer, and footer. Every page renders through this.
- `src/components/` — `Seo.astro` (per-page meta/OG/Twitter/JSON-LD), `Nav.astro`,
  `Drawer.astro`, `Footer.astro`, `SocialLinks.astro`, `BlogCard.astro` (shared post-card
  markup — used on the blog index, homepage teaser, and "read next"), `BlogCover.astro`
  (decorative per-post cover art, variant by topic), `ShareBar.astro` (X/LinkedIn/Instagram/
  copy-link on post pages), `ScreenshotSlider.astro` (auto-rotating product screenshot
  showcase for a product section).
- `src/data/nav.ts` — single source of truth for nav links and social profile URLs.
- `src/content.config.ts` + `src/content/blog/*.md` — the blog content collection. Each post
  is a Markdown file with `title`/`description`/`pubDate`/`cover` frontmatter; `cover` picks a
  `BlogCover` variant (`fields` | `report` | `market` | `trust` — add a new one in
  `BlogCover.astro` before using a new value here).
- `src/pages/` — one file per route:
  - `index.astro` → `/`
  - `get-started/index.astro` → `/get-started/`
  - `documentation/index.astro` → `/documentation/`
  - `blog/index.astro` → `/blog/` (post list)
  - `blog/[slug]/index.astro` → `/blog/<slug>/` (post detail, statically generated per post)
  - `404.astro` → `/404.html` (GitHub Pages' custom error page)
- `public/` — static files copied verbatim to the site root: CSS, JS, self-hosted DM Sans +
  Lobster Two fonts, icons, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`,
  `BingSiteAuth.xml`, and the IndexNow key-verification `.txt` file.

Adding a new page: create `src/pages/<name>/index.astro`, wrap it in `<BaseLayout ...>`, add
it to `src/data/nav.ts` if it belongs in the nav, and add it to `public/sitemap.xml`.

Adding a new blog post: add a Markdown file to `src/content/blog/`, then add its URL to
`public/sitemap.xml` — it does not update automatically.

## Commands

```
npm install       # first time / after pulling dependency changes
npm run dev       # local dev server with hot reload
npm run build     # production build -> dist/
npm run preview   # serve the built dist/ locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys
it via GitHub Pages (Pages source is set to **GitHub Actions**, not "Deploy from a branch").
Nothing to build or commit manually — `dist/` is never checked in.

A second job in the same workflow, `notify-indexnow`, runs after deploy: it reads every URL
out of `public/sitemap.xml` and POSTs them to `https://api.indexnow.org/indexnow` so Bing and
Yandex pick up changes without waiting on their own crawl schedule (Google doesn't use
IndexNow — GSC sitemap resubmission is still the way to prompt it). This means a stale or
incomplete `sitemap.xml` doesn't just hurt SEO, it actively under-reports what changed on every
deploy — keep it in sync with `src/pages/` and `src/content/blog/`.

## Notes

- `trailingSlash: 'always'` in `astro.config.mjs` keeps URLs matching the pre-Astro site
  (`/get-started/`, not `/get-started`) — don't change this without checking Search Console
  and Bing Webmaster Tools, both of which have the current URLs indexed.
- Analytics (GA4), the Bing verification meta tag, and the JSON-LD structured data
  (`Organization`/`WebSite`/`SoftwareApplication`) are wired centrally so every page stays in
  sync automatically — no more hand-copying tags across files.
