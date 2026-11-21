import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional().default(false),
    cover: z.enum(['fields', 'report', 'market', 'trust', 'web']).optional().default('report'),
  }),
});

// Translated posts live in src/content/blog-tr/<lang>/<slug>.md, with the same front matter as the English post.
const blogTr = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog-tr' }),
  schema: blog.schema as any,
});

export const collections = { blog, blogTr };
