import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Bulk Event Validation
|--------------------------------------------------------------------------
*/

export const bulkEventSchema = z.object({
  ids: z
    .array(z.string())
    .min(1, "Select at least one event."),
});

export type BulkEventPayload = z.infer<
  typeof bulkEventSchema
>;