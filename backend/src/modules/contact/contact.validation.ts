import { z } from "zod";

import { CONTACT_STATUS } from "./contact.constants.js";

/*
|--------------------------------------------------------------------------
| Create Contact
|--------------------------------------------------------------------------
*/

export const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(120),

  email: z
    .string()
    .trim()
    .email()
    .max(150),

  phone: z
    .string()
    .trim()
    .min(8)
    .max(20),

  subject: z
    .string()
    .trim()
    .min(2)
    .max(200),

  message: z
    .string()
    .trim()
    .min(10)
    .max(5000),
});

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export const updateContactStatusSchema = z.object({
  status: z.enum(CONTACT_STATUS),
});

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type ContactPayload =
  z.infer<typeof createContactSchema>;

export type UpdateContactStatusPayload =
  z.infer<typeof updateContactStatusSchema>;