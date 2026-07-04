import { z } from "zod";
import { imageSchema } from "../../shared/schemas/image.validation.js";
import { seoSchema } from "../../shared/schemas/seo.validation.js";

export const buttonSchema = z.object({
  text: z.string().min(1).max(50),

  url: z.string().min(1),

  target: z.enum(["_self", "_blank"]).default("_self"),

  variant: z
    .enum(["primary", "secondary", "outline"])
    .default("primary"),
});

export const createHeroSchema = z.object({
  title: z.string().min(2).max(120),

  subtitle: z.string().max(200).optional(),

  description: z.string().max(600).optional(),

  desktopImage: imageSchema,

  mobileImage: imageSchema,

  primaryButton: buttonSchema.optional(),

  secondaryButton: buttonSchema.optional(),

  overlayOpacity: z.number().min(0).max(100).default(40),

  textAlign: z
    .enum(["left", "center", "right"])
    .default("left"),

  displayOrder: z.number().int().min(1),

  status: z
    .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
    .default("DRAFT"),

  publishedAt: z.coerce.date().optional(),

  expiresAt: z.coerce.date().optional(),

  seo: seoSchema.optional(),
});