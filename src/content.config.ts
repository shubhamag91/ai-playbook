import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'zod';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        tags: z.array(z.string()).optional().default([]),
        glossaryLinks: z.array(z.string()).optional().default([]),
        seeAlso: z.array(z.object({
          label: z.string(),
          href: z.string(),
          description: z.string().optional(),
        })).optional().default([]),
      }),
    }),
  }),
};
