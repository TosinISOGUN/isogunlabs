# Field Hygiene launch announcement

## Goal
The company website reflects reality: Field Hygiene for Jira is approved and live on the
Atlassian Marketplace, not "coming soon." Every place the homepage and Get Started page frame
it as upcoming gets promoted to a full, live product showcase — matching how Recap is already
presented — plus a detailed blog post announcing the approval.

## Context read
- `listings/isogunlabs-home/src/pages/index.astro` — the "Coming soon" `cat-card` for Field
  Hygiene (line ~248), the full Recap showcase section it should be promoted to match
  (`.showcase` block, `recapShots` array, `ScreenshotSlider` usage, `prod-links`), the stale
  "About" paragraph calling Field Hygiene "next," the `jsonLd` `SoftwareApplication` entries
  (Recap has one, Field Hygiene doesn't), and the `BaseLayout` `description`/`ogDescription`
  props (currently mention only Recap).
- `listings/isogunlabs-home/src/pages/get-started/index.astro` — the mirrored "Coming soon"
  `cat-card soon` article (line ~44) and the live Recap `cat-card` it should match, plus the
  page's own stale `BaseLayout description`.
- `listings/isogunlabs-home/src/components/ScreenshotSlider.astro` — the reusable slider
  component; takes `shots` (array of `{src, width, height, alt}`), `barLabel`, `productUrl`,
  `productLabel`.
- `products/atlassian/field-hygiene/listing-copy-draft.md` — real tagline, feature list, and
  description to source copy from, so nothing drifts from what's actually in the Marketplace
  listing.
- `products/atlassian/field-hygiene/site/assets/img/` — real screenshots already captured
  (`shot-duplicates.png`, `shot-fieldlimits.png`, `shot-trends.png`, all 1104×540), confirmed
  no Field Hygiene images currently exist in `listings/isogunlabs-home/public/assets/`.
- `listings/isogunlabs-home/src/content/blog/introducing-passdown-shift-handoffs.md` — the
  frontmatter shape (`title`, `description`, `pubDate`, `cover`) and tone/length to match for
  the new post, per the owner's "make it detailed" instruction (same standard as Passdown's
  post, not a short announcement blurb).
- Live URL confirmed by the owner:
  `https://marketplace.atlassian.com/apps/2905942594` (Field Hygiene's real listing).

## Assumptions
- The three existing 1104×540 screenshots are marketing-cropped (2.044 aspect, same crop as
  the Marketplace Highlights) rather than raw full-browser captures like Recap's `recapShots`
  (~1.6 aspect) — using them as-is is fine since `ScreenshotSlider` takes explicit
  width/height per shot; no need to re-crop.
- "Detailed" for the blog post means the same length and structure as the Passdown
  announcement post (problem → what it does → how it's built/trusted → what's next), not a
  short news blurb — confirmed by the owner's explicit follow-up message.
- The blog post publishes with today's date and is a genuine launch announcement (unlike
  Passdown's post, which was explicitly framed as pre-submission) — Field Hygiene is actually
  approved, so no hedging language is needed here.
- Field Hygiene's Marketplace category/pricing claims in the new copy reuse exactly what's
  already live in `listing-copy-draft.md` (free ≤10 users, paid per seat above, same features
  every tier) — no new claims invented for the website that aren't already in the real listing.

## Files to change
- `listings/isogunlabs-home/public/assets/field-hygiene-01-duplicates.png` — NEW (copied from
  `shot-duplicates.png`)
- `listings/isogunlabs-home/public/assets/field-hygiene-02-fieldlimits.png` — NEW (copied from
  `shot-fieldlimits.png`)
- `listings/isogunlabs-home/public/assets/field-hygiene-03-trends.png` — NEW (copied from
  `shot-trends.png`)
- `listings/isogunlabs-home/src/pages/index.astro` — replace the "Coming soon" card with a
  full showcase section; add `fieldHygieneShots`; add a second `SoftwareApplication` JSON-LD
  entry; update the stale "About" paragraph; update `description`/`ogDescription`.
- `listings/isogunlabs-home/src/pages/get-started/index.astro` — replace the "Coming soon"
  article with a live `cat-card` (Marketplace + Learn more + Docs links); update the page's
  `BaseLayout description`.
- `listings/isogunlabs-home/src/content/blog/field-hygiene-approved-on-marketplace.md` — NEW,
  detailed launch-announcement post.

## What this builds
1. **Homepage showcase** — a new `.showcase` section for Field Hygiene directly under Recap's,
   same structure: copy column (product name + "For Jira Cloud" tag, description pulled from
   `listing-copy-draft.md`'s full description, 3 feature bullets, three links — "Get it on
   Marketplace" to the real URL, "Documentation & support" to
   `https://field-hygiene.isogunlabs.com/`, "Privacy" to the privacy page) and a
   `ScreenshotSlider` using the three copied screenshots, with a `mock-stat` pulled from a real
   number in the app (e.g. field-count guardrail or duplicate detection, phrased like Recap's
   "30 days" stat).
2. **"Coming soon" card removed** from both `index.astro` and `get-started/index.astro`,
   replaced with live cards — no more references to Field Hygiene as upcoming anywhere on the
   site.
3. **About section copy fix** — the sentence "Field Hygiene for Jira, which cleans up
   duplicate and unused custom fields, is next" gets rewritten in past/present tense to reflect
   it's shipped, alongside Recap, not queued after it.
4. **SEO/structured data** — a second `SoftwareApplication` entry in the homepage's `jsonLd`,
   matching Recap's shape, plus updated meta descriptions on both pages so search engines and
   social shares mention both apps, not just Recap.
5. **Blog post** — a detailed, real launch-announcement post (not a short blurb) covering: the
   problem Field Hygiene solves, what it actually catches (duplicates, near-duplicates, unused
   fields, missing descriptions, field-count guardrails, trends), how it's built and what it
   stores (read-only, Forge-only, one daily aggregate count), pricing, and a direct link to the
   Marketplace listing. Added to the homepage's "From the blog" section automatically via the
   existing `getCollection('blog')` sort.

## Security
No code, scope, or manifest changes — pure marketing-site content and static assets. No new
dependencies, no data storage changes.

## Done when
- Neither `index.astro` nor `get-started/index.astro` contains the words "Coming soon" next to
  Field Hygiene, or any framing of it as upcoming.
- Field Hygiene's homepage showcase renders with real screenshots, correct copy, and a working
  link to `https://marketplace.atlassian.com/apps/2905942594`.
- The new blog post exists, is detailed (matching Passdown's post length/structure), and
  appears in the homepage's "From the blog" section after `npm run build`.
- `npm run build` passes with no errors.

## Checks
- `npm run build` in `listings/isogunlabs-home/`.
- Visual check of the rendered homepage and get-started page (or the built HTML) confirming
  the screenshot slider renders and no broken image paths.

## Verification
Owner reviews the built homepage, get-started page, and the new blog post locally (or via the
built output) before this gets committed and pushed — same review step used for every prior
site update this session.
