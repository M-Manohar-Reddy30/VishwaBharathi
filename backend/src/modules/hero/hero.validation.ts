import { z } from "zod";

export const imageAssetSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().url(),
  alt: z.string().default(""),
  width: z.number().positive(),
  height: z.number().positive(),
  format: z.string(),
  bytes: z.number().nonnegative(),
});

export const buttonSchema = z.object({
  text: z.string().min(1).max(50),
  url: z.string().min(1),
  target: z.enum(["_self", "_blank"]),
  variant: z.enum(["primary", "secondary", "outline"]),
});

export const seoSchema = z.object({
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  keywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().url().optional(),
  ogImage: z.string().url().optional(),
});

export const auditSchema = z.object({
  createdBy: z.string(),
  updatedBy: z.string().optional(),
});

export const createHeroSchema = z.object({
  title: z.string().min(2).max(120),

  subtitle: z.string().max(200).optional(),

  description: z.string().max(600).optional(),

  desktopImage: imageAssetSchema,

  mobileImage: imageAssetSchema,

  primaryButton: buttonSchema,

  secondaryButton: buttonSchema.optional(),

  overlayOpacity: z.number().min(0).max(100).default(40),

  textAlign: z.enum(["left", "center", "right"]).default("left"),

  displayOrder: z.number().int().min(1),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),

  publishedAt: z.coerce.date().optional(),

  expiresAt: z.coerce.date().optional(),

  seo: seoSchema,

  audit: auditSchema,
});