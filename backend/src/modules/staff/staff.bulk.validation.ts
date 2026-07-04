import { z } from "zod";

export const bulkStaffSchema = z.object({
  ids: z
    .array(z.string())
    .min(1, "Select at least one staff member."),
});

export type BulkStaffPayload =
  z.infer<typeof bulkStaffSchema>;