import { z } from "zod";

export const fileSchema = z.object({
  publicId: z.string(),

  url: z.string().url(),

  format: z.string(),

  bytes: z.number(),
});