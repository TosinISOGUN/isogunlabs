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
    cover: z.enum(['fields', 'report', 'market', 'trust']).optional().default('report'),
  }),
});

export const collections = { blog };
