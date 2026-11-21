import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/config';

export const PAGE_SIZE = 8;

/** The posts of one language, newest first. English posts live in src/content/blog, the others in src/content/blog-tr/<lang>/. */
export async function postsFor(lang: Locale) {
  const entries: any[] = lang === 'en'
    ? await getCollection('blog', ({ data }) => !data.draft)
    : await getCollection('blogTr', ({ id, data }) => !data.draft && id.startsWith(lang + '/'));
  return entries
    .map((entry) => ({ entry, slug: lang === 'en' ? entry.id : entry.id.slice(lang.length + 1), data: entry.data, body: (entry.body ?? '') as string }))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
export type Post = Awaited<ReturnType<typeof postsFor>>[number];

/** Number of index pages: the newest post is featured on page 1, the rest are split into pages of PAGE_SIZE. */
export const pageCount = (total: number) => Math.max(1, Math.ceil(Math.max(0, total - 1) / PAGE_SIZE));
