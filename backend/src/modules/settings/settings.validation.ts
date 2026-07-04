import { z } from "zod";

import { WEBSITE_STATUS } from "./settings.constants.js";

import { imageSchema } from "../../shared/schemas/image.validation.js";

/*
|--------------------------------------------------------------------------
| Social Links
|--------------------------------------------------------------------------
*/

export const socialLinksSchema = z.object({
  facebook: z.string().url().optional(),

  instagram: z.string().url().optional(),

  youtube: z.string().url().optional(),

  linkedin: z.string().url().optional(),
});

/*
|--------------------------------------------------------------------------
| SEO
|--------------------------------------------------------------------------
*/

export const seoSchema = z.object({
  metaTitle: z
    .string()
    .trim()
    .min(2)
    .max(60),

  metaDescription: z
    .string()
    .trim()
    .min(10)
    .max(160),

  keywords: z
    .array(z.string().trim())
    .default([]),
});

/*
|--------------------------------------------------------------------------
| Create / Save Settings
|--------------------------------------------------------------------------
*/

export const createSettingsSchema = z.object({
  schoolName: z
    .string()
    .trim()
    .min(2)
    .max(150),

  shortName: z
    .string()
    .trim()
    .min(2)
    .max(50),

  logo: imageSchema,

  favicon: imageSchema,

  email: z
    .string()
    .trim()
    .email(),

  phone: z
    .string()
    .trim()
    .min(8)
    .max(20),

  alternatePhone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .optional(),

  address: z
    .string()
    .trim()
    .min(5)
    .max(500),

  socialLinks: socialLinksSchema.default({}),

  googleMapsEmbed: z
    .string()
    .url()
    .optional(),

  seo: seoSchema,

  copyright: z
    .string()
    .trim()
    .min(2)
    .max(200),

  websiteStatus: z
    .enum(WEBSITE_STATUS)
    .default("ACTIVE"),
});

/*
|--------------------------------------------------------------------------
| Update Settings
|--------------------------------------------------------------------------
*/

export const updateSettingsSchema =
  createSettingsSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type SettingsPayload =
  z.infer<typeof createSettingsSchema>;