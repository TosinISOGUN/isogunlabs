# Blog catch-up: new posts for isogunlabs.com

## Goal
The blog has not had a post since 28 Sep 2026. After this, it has a small batch of new, useful
posts (proposed: 4) that are live on `/blog/`, in the sitemap, and spread over a few weeks so the
blog does not look like it stopped and then dumped everything at once.

## Context read
`README.md` (how posts and the sitemap work), `src/content.config.ts` (post schema),
`src/lib/blogCategory.ts` (cover to category mapping), all 16 existing posts' titles,
descriptions and dates, the opening of `hidden-cost-of-cheap-websites.md` and
`three-apps-live-on-marketplace.md` (voice and structure), `prompts/blog-page-revamp.md`,
`public/sitemap.xml`, git log and git status.

## Assumptions
1. Posts are written in the existing voice: plain, first person plural ("we"), practical, with
   `##` sections and bullet lists. About 800 to 1,500 words each.
2. No invented numbers, installs, reviews, customer names or quotes. Any post that needs real
   figures waits until the owner supplies them.
3. No em dashes in the new copy (owner preference). Older posts are left as they are.
4. Website-service posts do not quote a price. The $799 offer lives on the portfolio, not here.
5. `cover` values stay within the existing four (`fields`, `report`, `market`, `trust`).
   No new category.
6. Nothing is committed or pushed until the owner says so. Pushing to `main` deploys the site.

## Proposed slate (owner picks which to write)
| # | Working title | Audience | Cover | Why now |
|---|---|---|---|---|
| 1 | How to find and clean up duplicate custom fields in Jira | Jira admins | fields | Evergreen how-to, searchable, ties to Field Hygiene |
| 2 | A shift handoff checklist for support teams | JSM and support leads | market | Evergreen, ties to Passdown, no product claims needed |
| 3 | What to have ready before you hire someone to build your website | Business owners | trust | Follows "The Hidden Cost of Cheap Websites". Text, photos, pages, who owns the domain |
| 4 | Is your Atlassian Connect app ready for the cutoff? | App builders | market | Time-sensitive. Needs current Atlassian dates fetched from the docs first |
| Held | Where Recap, Field Hygiene and Passdown stand after launch | Everyone | trust | Needs real install and review numbers from the owner. Not written without them |

## Files to change
- NEW `src/content/blog/<slug>.md` for each approved post (frontmatter: title, description,
  pubDate, cover)
- `public/sitemap.xml` (add each new post URL, newest first)

Not touched: the layout, components, styles, and the five files that are already modified and
uncommitted in the working tree.

## What this builds
Each post is a Markdown file in the same shape as the existing ones. `pubDate` values are
staggered (proposal: one every 4 to 5 days from today, 23 Oct) rather than all dated today.
Post 4 starts with fetching Atlassian's current documentation, not from memory.

## Security
No code, scope, dependency, storage or external service change. Content and sitemap only.

## Done when
- Each approved post appears on `/blog/` with the right category colour and badge.
- Each post page opens at `/blog/<slug>/` and shows title, date and body.
- Each URL is in `public/sitemap.xml`.
- No em dashes and no invented figures in the new posts.

## Checks
`npm run build` completes with no errors.

## Verification
1. `npm run build`, then `npm run preview`.
2. Open `/blog/` and confirm the new posts appear, newest first, with correct badges.
3. Open each new post and read it through.
4. Open `dist/sitemap.xml` and confirm the new URLs are listed.
