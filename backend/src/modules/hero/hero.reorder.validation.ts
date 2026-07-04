import { z } from "zod";

export const reorderHeroSchema = z.object({
  heroes: z
    .array(
      z.object({
        id: z.string().min(1),
        displayOrder: z.number().int().min(1),
      })
    )
    .min(1),
});

export type ReorderHeroPayload =
  z.infer<typeof reorderHeroSchema>;