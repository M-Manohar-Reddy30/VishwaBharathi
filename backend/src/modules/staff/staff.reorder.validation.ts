import { z } from "zod";

export const reorderStaffSchema = z.object({
  staff: z
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

export type ReorderStaffPayload =
  z.infer<typeof reorderStaffSchema>;