import { z } from "zod";

export const bulkGallerySchema = z.object({
  ids: z
    .array(z.string())
    .min(1),
});

export type BulkGalleryPayload =
  z.infer<typeof bulkGallerySchema>;