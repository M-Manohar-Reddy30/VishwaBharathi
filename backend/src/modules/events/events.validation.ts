import { z } from "zod";

import {
  EVENT_CATEGORY_VALUES,
  EVENT_STATUS_VALUES,
} from "./events.constants.js";

import { imageSchema } from "../../shared/schemas/image.validation.js";

/*
|--------------------------------------------------------------------------
| Base Event Schema
|--------------------------------------------------------------------------
*/

const baseEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2)
    .max(150),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers and hyphens."
    ),

  description: z
    .string()
    .trim()
    .min(10)
    .max(5000),

  bannerImage: imageSchema,

  venue: z
    .string()
    .trim()
    .min(2)
    .max(200),

  category: z.enum(EVENT_CATEGORY_VALUES),

  startDate: z.coerce.date(),

  endDate: z.coerce.date(),

  displayOrder: z
    .number()
    .int()
    .positive()
    .default(1),

  status: z
    .enum(EVENT_STATUS_VALUES)
    .default("DRAFT"),
});

/*
|--------------------------------------------------------------------------
| Create Event
|--------------------------------------------------------------------------
*/

export const createEventSchema = baseEventSchema.refine(
  (data) => data.endDate >= data.startDate,
  {
    message: "End date must be greater than or equal to start date.",
    path: ["endDate"],
  }
);

/*
|--------------------------------------------------------------------------
| Update Event
|--------------------------------------------------------------------------
*/

export const updateEventSchema = baseEventSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type EventPayload = z.infer<typeof createEventSchema>;