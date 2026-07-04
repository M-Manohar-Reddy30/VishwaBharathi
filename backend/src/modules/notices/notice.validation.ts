import { z } from "zod";

import { NOTICE_STATUS } from "./notice.constants.js";

import { imageSchema } from "../../shared/schemas/image.validation.js";
import { fileSchema } from "../../shared/schemas/file.validation.js";

/*
|--------------------------------------------------------------------------
| Create Notice
|--------------------------------------------------------------------------
*/

export const createNoticeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2)
    .max(150),

  description: z
    .string()
    .trim()
    .min(10)
    .max(3000),

  pdf: fileSchema,

  coverImage: imageSchema.optional(),

  publishDate: z.coerce.date(),

  displayOrder: z
    .number()
    .int()
    .positive()
    .default(1),

  status: z
    .enum(NOTICE_STATUS)
    .default("ACTIVE"),
});

/*
|--------------------------------------------------------------------------
| Update Notice
|--------------------------------------------------------------------------
*/

export const updateNoticeSchema =
  createNoticeSchema.partial();

export type NoticePayload =
  z.infer<typeof createNoticeSchema>;