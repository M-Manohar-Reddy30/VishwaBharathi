import { z } from "zod";

export const noticeSchema = z.object({
  title: z
    .string()
    .min(2, "Title is required.")
    .max(150),

  description: z
    .string()
    .min(10)
    .max(3000),

  pdf: z.object({
    publicId: z.string(),

    url: z.string().url(),

    format: z.string(),

    bytes: z.number(),
  }),

  coverImage: z
    .object({
      publicId: z.string(),

      url: z.string().url(),

      alt: z.string().optional(),

      width: z.number().optional(),

      height: z.number().optional(),

      format: z.string().optional(),

      bytes: z.number().optional(),
    })
    .optional(),

  publishDate: z.coerce.date(),

  displayOrder: z.number(),

  status: z.enum([
    "ACTIVE",
    "INACTIVE",
  ]),
});

export type NoticeFormValues =
  z.infer<typeof noticeSchema>;