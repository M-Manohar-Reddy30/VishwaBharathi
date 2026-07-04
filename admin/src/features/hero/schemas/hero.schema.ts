import { z } from "zod";

const imageSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  format: z.string().optional(),
  bytes: z.number().optional(),
});

const buttonSchema = z.object({
  text: z.string().min(1, "Button text is required").max(50),
  url: z.string().min(1, "Button URL is required"),
  target: z.enum(["_self", "_blank"]).default("_self"),
  variant: z
    .enum(["primary", "secondary", "outline"])
    .default("primary"),
});

const seoSchema = z.object({
  metaTitle: z
    .string()
    .max(60, "Maximum 60 characters")
    .optional(),

  metaDescription: z
    .string()
    .max(160, "Maximum 160 characters")
    .optional(),

  keywords: z.preprocess(
        (value) => {
            if (typeof value !== "string") {
            return [];
            }

            return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        },
        z.array(z.string())
    ).default([]),

  canonicalUrl: z.string().url().optional().or(z.literal("")),

  ogImage: z.string().url().optional().or(z.literal("")),
});

export const heroSchema = z.object({
  title: z
    .string()
    .min(2, "Title must contain at least 2 characters")
    .max(120),

  subtitle: z
    .string()
    .max(200)
    .optional(),

  description: z
    .string()
    .max(600)
    .optional(),

  desktopImage: imageSchema,

  mobileImage: imageSchema,

  primaryButton: buttonSchema.optional(),

  secondaryButton: buttonSchema.optional(),

  overlayOpacity: z
    .number()
    .min(0)
    .max(100)
    .default(40),

  textAlign: z
    .enum([
      "left",
      "center",
      "right",
    ])
    .default("left"),

  displayOrder: z
    .number()
    .int()
    .min(1),

  status: z
    .enum([
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
    ])
    .default("DRAFT"),

  publishedAt: z
    .date()
    .optional(),

  expiresAt: z
    .date()
    .optional(),

  seo: seoSchema.optional(),
});

export type HeroFormValues = z.infer<typeof heroSchema>;