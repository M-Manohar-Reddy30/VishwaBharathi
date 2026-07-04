import { z } from "zod";

export const bulkHeroSchema = z.object({
  ids: z
    .array(z.string().min(1))
    .min(1, "Select at least one hero.")
    .max(100, "Maximum 100 heroes can be processed at once."),
});

export type BulkHeroPayload = z.infer<typeof bulkHeroSchema>;