import { Schema, InferSchemaType, model } from "mongoose";

import {
  EVENT_CATEGORY,
  EVENT_CATEGORY_VALUES,
  EVENT_STATUS,
  EVENT_STATUS_VALUES,
} from "./events.constants.js";

import imageSchema from "../../shared/schemas/image.schema.js";
import auditSchema from "../../shared/schemas/audit.schema.js";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    bannerImage: {
      type: imageSchema,
      required: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      enum: EVENT_CATEGORY_VALUES,
      default: EVENT_CATEGORY.OTHER,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 1,
    },

    status: {
        type: String,
        enum: EVENT_STATUS_VALUES,
        default: EVENT_STATUS.DRAFT,
        index: true,
    },

    publishedAt: Date,

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

eventSchema.index({
  status: 1,
  isDeleted: 1,
  displayOrder: 1,
});

eventSchema.index({
  category: 1,
});

eventSchema.index({
  startDate: 1,
});

eventSchema.index({
  title: "text",
  description: "text",
  venue: "text",
});

export type EventDocument = InferSchemaType<
  typeof eventSchema
>;

const Event = model<EventDocument>(
  "Event",
  eventSchema
);

export default Event;