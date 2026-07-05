import { z } from "zod";

export const eventSchema = z
  .object({
    title: z
      .string()
      .min(2, "Title is required.")
      .max(150),

    slug: z
      .string()
      .min(2)
      .max(200)
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must contain only lowercase letters, numbers and hyphens."
      ),

    description: z
      .string()
      .min(10)
      .max(5000),

    bannerImage: z.object({
      publicId: z.string(),

      url: z.string().url(),

      alt: z.string().optional(),

      width: z.number().optional(),

      height: z.number().optional(),

      format: z.string().optional(),

      bytes: z.number().optional(),
    }),

    venue: z
      .string()
      .min(2)
      .max(200),

    category: z.enum([
      "ACADEMIC",
      "CULTURAL",
      "SPORTS",
      "WORKSHOP",
      "SEMINAR",
      "AWARENESS",
      "CELEBRATION",
      "OTHER",
    ]),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),

    displayOrder: z.number(),

    status: z.enum([
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
    ]),
  })
  .refine(
    (data) => data.endDate >= data.startDate,
    {
      path: ["endDate"],
      message:
        "End date must be after start date.",
    }
  );

export type EventFormValues =
  z.infer<typeof eventSchema>;