import { z } from "zod";

export const bulkNoticeSchema = z.object({
  ids: z
    .array(z.string())
    .min(1, "Select at least one notice."),
});

export type BulkNoticePayload =
  z.infer<typeof bulkNoticeSchema>;