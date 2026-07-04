import { z } from "zod";

export const reorderNoticeSchema = z.object({
  notices: z
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

export type ReorderNoticePayload =
  z.infer<typeof reorderNoticeSchema>;