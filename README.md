# isogunlabs.com

The Isogun Labs studio website — built with [Astro](https://astro.build), deployed to
GitHub Pages at the custom domain `isogunlabs.com`.

## Structure

- `src/layouts/BaseLayout.astro` — shared `<head>` (meta/SEO/analytics/icons), nav, mobile
  drawer, and footer. Every page renders through this.
- `src/components/` — `Seo.astro` (per-page meta/OG/Twitter/JSON-LD), `Nav.astro`,
  `Drawer.astro`, `Footer.astro`, `SocialLinks.astro`.
- `src/data/nav.ts` — single source of truth for nav links and social profile URLs.
- `src/pages/` — one file per route:
  - `index.astro` → `/`
  - `get-started/index.astro` → `/get-started/`
  - `documentation/index.astro` → `/documentation/`
  - `404.astro` → `/404.html` (GitHub Pages' custom error page)
- `public/` — static files copied verbatim to the site root: CSS, JS, icons, `robots.txt`,
  `sitemap.xml`, `site.webmanifest`, `CNAME`, `BingSiteAuth.xml`.

Adding a new page: create `src/pages/<name>/index.astro`, wrap it in `<BaseLayout ...>`, add
it to `src/data/nav.ts` if it belongs in the nav, and add it to `public/sitemap.xml`.

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

## Notes

- `trailingSlash: 'always'` in `astro.config.mjs` keeps URLs matching the pre-Astro site
  (`/get-started/`, not `/get-started`) — don't change this without checking Search Console
  and Bing Webmaster Tools, both of which have the current URLs indexed.
- Analytics (GA4), the Bing verification meta tag, and the JSON-LD structured data
  (`Organization`/`WebSite`/`SoftwareApplication`) are wired centrally so every page stays in
  sync automatically — no more hand-copying tags across files.
