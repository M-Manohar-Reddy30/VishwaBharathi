import { Schema, InferSchemaType, model } from "mongoose";

import {
  GALLERY_CATEGORY,
  GALLERY_STATUS,
} from "./gallery.constants.js";
import imageSchema from "../../shared/schemas/image.schema.js";
import auditSchema from "../../shared/schemas/audit.schema.js";

/*
|--------------------------------------------------------------------------
| Gallery Schema
|--------------------------------------------------------------------------
*/

const gallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    image: {
      type: imageSchema,
      required: true,
    },

    category: {
      type: String,
      enum: GALLERY_CATEGORY,
      default: "OTHER",
      index: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    displayOrder: {
      type: Number,
      default: 1,
      index: true,
    },

    status: {
      type: String,
      enum: GALLERY_STATUS,
      default: "ACTIVE",
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: Date,

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

gallerySchema.index({
  category: 1,
  status: 1,
});

gallerySchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

gallerySchema.index({
  displayOrder: 1,
});

export type GalleryDocument = InferSchemaType<
  typeof gallerySchema
>;

const Gallery = model<GalleryDocument>(
  "Gallery",
  gallerySchema
);

export default Gallery;