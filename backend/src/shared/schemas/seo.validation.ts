import { z } from "zod";

export const seoSchema = z.object({
    metaTitle: z.string().max(60).optional(),

    metaDescription: z.string().max(160).optional(),

    keywords: z.array(z.string()).default([]),

    canonicalUrl: z.string().url().optional(),

    ogImage: z.string().url().optional(),
});