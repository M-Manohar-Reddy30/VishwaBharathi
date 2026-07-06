import { z } from "zod";

export const staffSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required.")
    .max(120),

  designation: z
    .string()
    .min(2)
    .max(120),

  qualification: z
    .string()
    .min(2)
    .max(150),

  experience: z
    .string()
    .max(50)
    .optional(),

  bio: z
    .string()
    .min(10)
    .max(3000),

  photo: z.object({
    publicId: z.string(),

    url: z.string().url(),

    alt: z.string().optional(),

    width: z.number().optional(),

    height: z.number().optional(),

    format: z.string().optional(),

    bytes: z.number().optional(),
  }),

  department: z.enum([
    "MANAGEMENT",
    "ADMINISTRATION",
    "SPECIAL_EDUCATION",
    "THERAPY",
    "VOCATIONAL_TRAINING",
    "SUPPORT_STAFF",
    "OTHER",
  ]),

  displayOrder: z.number(),

  status: z.enum([
    "ACTIVE",
    "INACTIVE",
  ]),
});

export type StaffFormValues =
  z.infer<typeof staffSchema>;