# Blog page revamp

## Goal
The `/blog/` index and its cards look like a real editorial section — a large featured post,
color-coded category cards, and a lightweight sidebar — instead of the current uniform grid of
small icon-covered cards. Individual post pages (`/blog/[slug]/`) are untouched.

## Context read
`src/pages/blog/index.astro`, `src/components/BlogCard.astro`, `src/components/BlogCover.astro`,
`src/content.config.ts` (blog schema — currently `title, description, pubDate, updatedDate,
draft, cover`, where `cover` is a 4-value enum: `fields | report | market | trust`),
`public/assets/css/site.css` (existing tokens: navy/blue/orange only — no purple/teal, `.blog-*`
rules at lines ~271-298), `get-started/index.astro`'s `.cat-card`/`.badge-soon` pattern (reused
styling convention elsewhere on the site). Reference: a screenshot the owner shared of Bitovi's
blog page (bitovi.com) — used for layout/structure inspiration only, not copied. Bitovi is a
different company's real branding; nothing of theirs (their exact colors, logo, or copy) gets
reproduced here.

## Assumptions — flagging before building, not after
1. **No working "Subscribe" email capture.** Bitovi's sidebar has a newsletter signup form.
   Building a real one means an email service integration and storing addresses somewhere —
   that's an automatic ASK under `SKILLS.md` (storage + likely a new dependency) and isn't part
   of this prompt. Substitute: reuse the site's existing "Get in touch" pattern (an
   `mailto:support@isogunlabs.com` card) instead of a form. If a real newsletter is wanted
   later, that's its own prompt.
2. **No per-post author avatars.** The blog schema has no author field and there are no
   headshot assets. Bitovi's cards show a named author with photo per post; ours will keep the
   existing date + reading-time meta line instead of inventing an author field with placeholder
   photos.
3. **Categories come from the existing `cover` enum, not a new field.** Mapping:
   `fields` → "Field Hygiene" (teal), `report` → "Status Reports" (blue), `market` →
   "Marketplace" (amber/orange, matches existing brand orange), `trust` → "Trust & Security"
   (a new muted violet, the one genuinely new color token this adds). No schema change, no new
   frontmatter to backfill on 5 existing posts.
4. **Category filter tabs, client-side only, vanilla JS.** With 4 categories and 5 posts total
   it's a light feature, not urgent — included because it's cheap (no new dependency, `display:
   none` toggling) and matches the reference layout, but flagging it as the one part of this
   prompt that's more "nice to have" than "needed." Cut it if the owner would rather keep this
   prompt smaller.
5. Pagination is skipped — 5 posts don't need it. Room is left in the markup so it's not a
   rebuild if the post count grows later.

## Files to change
- `src/pages/blog/index.astro` — new layout: featured-post hero (latest post, large card),
  category filter tabs, two-column body (sidebar + card grid).
- `src/components/BlogCard.astro` — rebuilt to show the full-bleed colored cover with the title
  overlaid at the bottom (image-card style) instead of small icon + separate text block below.
- `src/components/BlogCover.astro` — extended with a `category` output (label + color) derived
  from `variant`, used for the badge pill on each card.
- `public/assets/css/site.css` — new rules for `.blog-featured`, `.blog-filters`,
  `.blog-layout` (sidebar + grid), `.blog-sidebar`, updated `.blog-card`/`.blog-cover` for the
  full-bleed image-card treatment, one new color token (`--violet` family) for the Trust &
  Security category.
- NEW `src/components/BlogSidebar.astro` — the "Get in touch" card + a short "What we write
  about" blurb, replacing Bitovi's subscribe-form/Discord-CTA sidebar with things this site
  actually has.

## What this builds
- **Featured post:** the single latest post (`posts[0]`) rendered large at the top — full-width
  colored cover, category badge, title, description, date/reading-time, linking to the post.
- **Category filter tabs:** "All", plus one tab per category present in the current post set.
  Clicking a tab shows/hides cards by a `data-category` attribute — plain `<script>`, no
  framework, no new dependency, mirrors how `reveal` scroll-in classes are already handled
  elsewhere on this site (vanilla JS, no build step change).
- **Card grid:** remaining posts (`posts.slice(1)`) as image-style cards — full-bleed colored
  cover fills the card, category badge pinned top-left, title in white overlaid at the bottom
  of the cover (matches the reference's visual weight), then a plain-background footer strip
  below with date, reading time, and description.
- **Sidebar:** sits beside the grid on desktop, stacks above/below on mobile (same breakpoint
  pattern already used for `.catalog`). Contains the `mailto:` "Get in touch" card (copied
  pattern from the existing `.contact` block in `index.astro`'s About section) and a short
  static blurb about what the blog covers — no dynamic content, no new data source.
- Individual post pages and the RSS feed are unaffected — this is the index page only.

## Security
No new scope, no new dependency, no storage, no external service, no analytics beyond what
`Seo.astro`/GA already does site-wide. Purely presentational — HTML/CSS/vanilla JS.

## Done when
- `/blog/` shows one large featured card for the latest post, then a colored, category-badged
  grid for the rest.
- Category tabs filter the grid client-side (not the featured card) without a page reload.
- Sidebar renders beside the grid on desktop and above it on mobile, with a working
  `mailto:support@isogunlabs.com` link.
- All 5 existing posts render correctly with the right category color/label derived from their
  existing `cover` value — no frontmatter edits needed on any post file.
- Individual post pages (`/blog/[slug]/`) are visually unchanged.

## Checks
`npm run build` (must complete cleanly, same as every prior verification this session).

## Verification
1. `npm run build`, then `npm run preview` (or open `dist/blog/index.html` directly).
2. Confirm the latest post (currently "Recap demo walkthrough" or whichever is newest by
   `pubDate`) renders as the large featured card.
3. Confirm the other 4 posts render as colored cards with a category badge matching their
   `cover` value, and that clicking each filter tab shows only that category's cards (and "All"
   shows everything).
4. Resize to mobile width, confirm the sidebar stacks sensibly and the grid drops to one
   column.
5. Click into one post from the featured card and one from the grid, confirm both land on the
   correct, unchanged post page.
