# Broaden homepage positioning beyond Atlassian-only

## Goal
Resolve the vendor-identity action item from `products/shopify/sweep-app/CLAUDE.md`: Sweep
ships under the Isogun Labs name (owner decision, 2026-08-01), which means isogunlabs.com's
current all-Atlassian positioning needs to broaden before Sweep goes live under this name.
Scope was widened past the literal action item (title tag, meta description,
`knowsAbout`/`og:description`) to also cover visible homepage copy — a site that broadens its
meta/schema but still visibly declares "100% runs on Atlassian" throughout the page body would
be a real inconsistency for any visitor, not just an SEO-layer fix (owner decision, 2026-08-01).

## Context read
- `products/shopify/sweep-app/CLAUDE.md`'s "Publisher, vendor & hosting" section — the
  original action item this prompt resolves
- `listings/isogunlabs-home/src/pages/index.astro` — the homepage; all copy changes below are
  in this one file
- `listings/isogunlabs-home/README.md` — this is a real production site (GitHub Pages,
  `isogunlabs.com`), deploy-on-push to `main` via `.github/workflows/deploy.yml`, with a
  post-deploy IndexNow ping. Meta/description changes are exactly the kind of change that site
  is set up to propagate immediately — treat this as a real, live, indexed-content change, not
  a low-stakes copy edit.

## Assumptions
- **No product-card additions.** Sweep is not submitted or approved yet, and the pending
  theme-write exemption (see `products/shopify/sweep-app/AGENTS.md`) means its core feature
  set isn't even fully buildable yet. This prompt broadens *language* (removing
  Atlassian-exclusivity claims) — it does not add a Sweep teaser/showcase section the way
  Field Hygiene has one. Premature product marketing for an unapproved, unfinished app is a
  bigger risk than under-promoting it.
- **One real factual correction, not just tone:** the stats section currently claims "0 write
  permissions requested, ever." That's true for Recap today but will become false the moment
  Sweep ships, since removal/backup requires `write_themes`. This needs a real wording fix
  (e.g. "minimal, justified permissions only"), not a cosmetic pass — flagged explicitly here
  rather than silently patched, since it's a factual claim about the whole studio, not just
  phrasing.
- Do not touch URLs, `path` props, `sitemap.xml`, or anything structural — text content only,
  confined to `index.astro`. No new pages.
- Where existing copy is already platform-neutral (the H1: "focused apps for the tools your
  team already uses"; the about section's "platforms you already trust"), leave it alone —
  only touch lines that currently assert Atlassian-exclusivity.

## Exact changes

**`BaseLayout` props (title/description/jsonLd) — the literal original action item:**
- `title`: `"Isogun Labs — Jira Status Reports & Focused Apps for Atlassian"` →
  `"Isogun Labs — Focused Apps for the Platforms Teams Build On"`
- `description`: `"Isogun Labs builds small, focused apps for Atlassian and Jira — starting
  with Recap, a one-click Jira status report app for completed work."` → `"Isogun Labs builds
  small, focused apps for the platforms teams already use, starting with Recap for Jira."`
- `ogDescription`: `"An independent software studio building small, focused apps for
  Atlassian and Jira. Maker of Recap — one-click monthly status reports."` → `"An independent
  software studio building small, focused apps for the platforms teams already use. Maker of
  Recap, one-click monthly status reports for Jira."`
- `jsonLd` Organization + WebSite `description`: `"Independent software studio building small,
  focused apps for Atlassian and Jira."` → `"Independent software studio building small,
  focused apps for the platforms teams build on."`
- `jsonLd` Organization `knowsAbout`: add `"Shopify apps"` and `"Shopify theme development"`
  to the existing array (`['Atlassian Forge', 'Jira apps', 'Atlassian Marketplace', 'status
  reporting', 'Atlassian Cloud apps']`), per CLAUDE.md's explicit instruction

**Visible copy — broadened to remove exclusivity claims:**
- Hero lead paragraph: `"Isogun Labs builds small, focused apps for Atlassian, starting with
  Jira status reports and more on the way."` → `"Isogun Labs builds small, focused apps for
  the platforms teams already use, starting with Jira status reports and expanding from
  there."`
- Trust band (three `<span>` items directly under the integrations section): `"Built on
  Atlassian Forge"` / `"Runs entirely on Atlassian"` / `"Private by design, nothing leaves
  Atlassian"` → `"Built for the platform, not around it"` / `"No third-party servers, ever"` /
  `"Private by design, nothing leaves the platform you already trust"`
- Stats section stat labels: `"0 write permissions requested, ever"` → `"Minimal, justified
  permissions only"` (the factual fix noted above); `"100% runs on Atlassian — nothing leaves
  the platform"` → `"100% runs on the platform you install it on"`
- "Why it matters" split section paragraph: `"Everything stays inside Atlassian's platform, we
  run no third-party servers..."` → `"Everything stays inside the platform it runs on, we run
  no third-party servers..."`; split-stat label `"100% of the work runs on Atlassian — nothing
  leaves the platform you already trust"` → `"100% of the work stays on the platform you
  already trust — nothing leaves it"`
- CTA section: `"Join the teams putting small, private tools to work right inside
  Atlassian."` → `"Join the teams putting small, private tools to work right inside the
  platforms they already use."`

**Deliberately left unchanged** (already accurate, not exclusivity claims):
- The "Works where you already work" integrations list (Jira/Confluence/Bitbucket/Trello/
  Forge/Atlassian Cloud) — still literally true today, no other platform is live yet
- The about section's roadmap paragraph naming Field Hygiene as next — a separate, later
  decision, not part of this prompt's scope
- The blog teaser's "Notes on Jira" heading — describes actual current blog content, which is
  genuinely Jira-focused today

## Files to change
- `listings/isogunlabs-home/src/pages/index.astro` only

## What this builds
Apply every change listed above, verbatim as specified (owner already reviewed the exact
before/after text in this prompt — no additional copy invention at build time beyond what's
listed here).

## Security
N/A — static marketing copy, no code/API/data changes.

## Done when
- Every change listed above is applied and nothing else in the file changed
- `npm run build` succeeds locally (Astro build)
- Diff reviewed against this prompt's exact list before pushing to `main` (this deploys
  automatically and pings IndexNow — no undo-by-redeploy safety net for search engines)

## Checks
- `npm run build`

## Verification
1. `npm run preview` locally, confirm the homepage reads correctly and no layout broke from
   the text-length changes (some new strings are longer/shorter than the originals)
2. Diff review: confirm only the listed strings changed, nothing else
3. Owner confirms before pushing to `main` — this is a live, indexed, auto-deploying site
