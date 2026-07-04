import { z } from "zod";

import {
  STAFF_DEPARTMENT,
  STAFF_STATUS,
} from "./staff.constants.js";

import { imageSchema } from "../../shared/schemas/image.validation.js";

/*
|--------------------------------------------------------------------------
| Create Staff
|--------------------------------------------------------------------------
*/

export const createStaffSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(120),

  designation: z
    .string()
    .trim()
    .min(2)
    .max(120),

  qualification: z
    .string()
    .trim()
    .min(2)
    .max(150),

  experience: z
    .string()
    .trim()
    .max(50)
    .optional(),

  bio: z
    .string()
    .trim()
    .min(10)
    .max(3000),

  photo: imageSchema,

  department: z.enum(STAFF_DEPARTMENT),

  displayOrder: z
    .number()
    .int()
    .positive()
    .default(1),

  status: z
    .enum(STAFF_STATUS)
    .default("ACTIVE"),
});

/*
|--------------------------------------------------------------------------
| Update Staff
|--------------------------------------------------------------------------
*/

export const updateStaffSchema =
  createStaffSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type StaffPayload =
  z.infer<typeof createStaffSchema>;