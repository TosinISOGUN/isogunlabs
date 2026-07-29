// Categories are derived from the existing `cover` enum on each post's frontmatter
// (src/content.config.ts) — no new frontmatter field, no edits needed on existing posts.
export const BLOG_CATEGORIES = {
  fields: { label: 'Field Hygiene', color: 'navy' },
  report: { label: 'Status Reports', color: 'blue' },
  market: { label: 'Marketplace', color: 'orange' },
  trust: { label: 'Trust & Security', color: 'violet' },
} as const;

export type BlogCoverVariant = keyof typeof BLOG_CATEGORIES;

export function categoryFor(variant: BlogCoverVariant) {
  return BLOG_CATEGORIES[variant];
}
