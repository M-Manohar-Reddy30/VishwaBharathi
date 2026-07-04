import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Reorder Events Validation
|--------------------------------------------------------------------------
*/

export const reorderEventSchema = z.object({
  events: z
    .array(
      z.object({
        id: z.string(),

        displayOrder: z
          .number()
          .int()
          .positive(),
      })
    )
    .min(1),
});

export type ReorderEventPayload =
  z.infer<typeof reorderEventSchema>;