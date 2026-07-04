import { z } from "zod";

import { ADMISSION_STATUS } from "./admission.constants.js";

import { imageSchema } from "../../shared/schemas/image.validation.js";
import { fileSchema } from "../../shared/schemas/file.validation.js";

/*
|--------------------------------------------------------------------------
| Sub Schemas
|--------------------------------------------------------------------------
*/

export const admissionStepSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2)
    .max(120),

  description: z
    .string()
    .trim()
    .min(5)
    .max(500),
});

export const requiredDocumentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(150),
});

/*
|--------------------------------------------------------------------------
| Create Admission
|--------------------------------------------------------------------------
*/

export const createAdmissionSchema = z.object({
  bannerTitle: z
    .string()
    .trim()
    .min(2)
    .max(150),

  bannerDescription: z
    .string()
    .trim()
    .min(10)
    .max(1000),

  bannerImage: imageSchema,

  process: z
    .array(admissionStepSchema)
    .default([]),

  eligibility: z
    .array(
      z.string().trim().min(2)
    )
    .default([]),

  requiredDocuments: z
    .array(requiredDocumentSchema)
    .default([]),

  feeStructurePdf: fileSchema.optional(),

  brochurePdf: fileSchema.optional(),

  applyNowUrl: z
    .string()
    .url()
    .optional(),

  status: z
    .enum(ADMISSION_STATUS)
    .default("ACTIVE"),
});

/*
|--------------------------------------------------------------------------
| Update Admission
|--------------------------------------------------------------------------
*/

export const updateAdmissionSchema =
  createAdmissionSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type AdmissionPayload =
  z.infer<typeof createAdmissionSchema>;