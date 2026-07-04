import { Schema, InferSchemaType, model } from "mongoose";

import { NOTICE_STATUS } from "./notice.constants.js";

import imageSchema from "../../shared/schemas/image.schema.js";
import auditSchema from "../../shared/schemas/audit.schema.js";
import fileSchema from "../../shared/schemas/file.schema.js";

const pdfSchema = new Schema(
  {
    publicId: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    format: {
      type: String,
      required: true,
    },

    bytes: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    pdf: {
     type: fileSchema,
     required: true,
    },

    coverImage: {
      type: imageSchema,
    },

    publishDate: {
      type: Date,
      required: true,
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 1,
      index: true,
    },

    status: {
      type: String,
      enum: NOTICE_STATUS,
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

noticeSchema.index({
  status: 1,
  displayOrder: 1,
});

noticeSchema.index({
  publishDate: -1,
});

noticeSchema.index({
  title: "text",
  description: "text",
});

export type NoticeDocument = InferSchemaType<
  typeof noticeSchema
>;

const Notice = model<NoticeDocument>(
  "Notice",
  noticeSchema
);

export default Notice;