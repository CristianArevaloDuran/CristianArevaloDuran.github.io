import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(['es', 'en']),
    github: z.string(),
    demo: z.string().optional(),
    gallery: z.array(z.string()).optional()
  }),
});

export const collections = {
  projects,
};
