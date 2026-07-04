import { Schema, InferSchemaType, model } from "mongoose";

import {
  STAFF_DEPARTMENT,
  STAFF_STATUS,
} from "./staff.constants.js";

import imageSchema from "../../shared/schemas/image.schema.js";
import auditSchema from "../../shared/schemas/audit.schema.js";

/*
|--------------------------------------------------------------------------
| Staff Schema
|--------------------------------------------------------------------------
*/

const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    experience: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    bio: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    photo: {
      type: imageSchema,
      required: true,
    },

    department: {
      type: String,
      enum: STAFF_DEPARTMENT,
      default: "OTHER",
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 1,
      index: true,
    },

    status: {
      type: String,
      enum: STAFF_STATUS,
      default: "ACTIVE",
      index: true,
    },

    audit: auditSchema,

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
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

staffSchema.index({
  status: 1,
  displayOrder: 1,
});

staffSchema.index({
  department: 1,
});

staffSchema.index({
  name: "text",
  designation: "text",
  qualification: "text",
  bio: "text",
});

export type StaffDocument = InferSchemaType<
  typeof staffSchema
>;

const Staff = model<StaffDocument>(
  "Staff",
  staffSchema
);

export default Staff;