import { Schema, InferSchemaType, model } from "mongoose";

import { ADMISSION_STATUS } from "./admission.constants.js";

import imageSchema from "../../shared/schemas/image.schema.js";
import fileSchema from "../../shared/schemas/file.schema.js";
import auditSchema from "../../shared/schemas/audit.schema.js";

/*
|--------------------------------------------------------------------------
| Sub Schemas
|--------------------------------------------------------------------------
*/

const processStepSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  {
    _id: false,
  }
);

const requiredDocumentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
  },
  {
    _id: false,
  }
);

/*
|--------------------------------------------------------------------------
| Admission Schema
|--------------------------------------------------------------------------
*/

const admissionSchema = new Schema(
  {
    bannerTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    bannerDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    bannerImage: {
      type: imageSchema,
      required: true,
    },

    process: {
      type: [processStepSchema],
      default: [],
    },

    eligibility: {
      type: [String],
      default: [],
    },

    requiredDocuments: {
      type: [requiredDocumentSchema],
      default: [],
    },

    feeStructurePdf: {
      type: fileSchema,
      default: null,
    },

    brochurePdf: {
      type: fileSchema,
      default: null,
    },

    applyNowUrl: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ADMISSION_STATUS,
      default: "ACTIVE",
    },

    audit: auditSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

admissionSchema.index({
  status: 1,
});

export type AdmissionDocument = InferSchemaType<
  typeof admissionSchema
>;

const Admission = model<AdmissionDocument>(
  "Admission",
  admissionSchema
);

export default Admission;