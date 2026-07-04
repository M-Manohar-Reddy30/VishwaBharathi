import { z } from "zod";

export const imageSchema = z.object({
  publicId: z.string().min(1),

  url: z.string().url(),

  alt: z.string().optional(),

  width: z.number().optional(),

  height: z.number().optional(),

  format: z.string().optional(),

  bytes: z.number().optional(),
});