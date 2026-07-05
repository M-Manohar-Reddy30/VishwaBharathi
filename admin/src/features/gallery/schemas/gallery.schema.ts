import { z } from "zod";

export const gallerySchema = z.object({
  title: z
    .string()
    .min(2, "Title is required.")
    .max(120),

  description: z
    .string()
    .max(500)
    .optional(),

  image: z.object({
    publicId: z.string(),

    url: z.string().url(),

    alt: z.string().optional(),

    width: z.number().optional(),

    height: z.number().optional(),

    format: z.string().optional(),

    bytes: z.number().optional(),
  }),

  category: z.enum([
    "CAMPUS",
    "EVENT",
    "SPORTS",
    "ACADEMICS",
    "CULTURAL",
    "OTHER",
  ]),

  tags: z
  .string()
  .default(""),

  displayOrder: z.number(),

  status: z.enum([
    "ACTIVE",
    "HIDDEN",
  ]),
});

export type GalleryFormValues =
  z.infer<typeof gallerySchema>;