import { z } from "zod";

import {
  GALLERY_CATEGORY,
  GALLERY_STATUS,
} from "./gallery.constants.js";
import { imageSchema } from "../../shared/schemas/image.validation.js";

/*
|--------------------------------------------------------------------------
| Create Gallery
|--------------------------------------------------------------------------
*/

export const createGallerySchema = z.object({
  title: z
    .string()
    .trim()
    .min(2)
    .max(120),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  image: imageSchema,

  category: z.enum(GALLERY_CATEGORY),

  tags: z
    .array(z.string().trim())
    .default([]),

  displayOrder: z
    .number()
    .int()
    .positive()
    .default(1),

  status: z
    .enum(GALLERY_STATUS)
    .default("ACTIVE"),
});

/*
|--------------------------------------------------------------------------
| Update Gallery
|--------------------------------------------------------------------------
*/

export const updateGallerySchema =
  createGallerySchema.partial();

export type GalleryPayload =
  z.infer<typeof createGallerySchema>;