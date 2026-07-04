import { Schema, InferSchemaType, model } from "mongoose";

import { WEBSITE_STATUS } from "./settings.constants.js";

import imageSchema from "../../shared/schemas/image.schema.js";
import auditSchema from "../../shared/schemas/audit.schema.js";

/*
|--------------------------------------------------------------------------
| SEO Schema
|--------------------------------------------------------------------------
*/

const seoSchema = new Schema(
  {
    metaTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },

    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    keywords: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    _id: false,
  }
);

/*
|--------------------------------------------------------------------------
| Social Links Schema
|--------------------------------------------------------------------------
*/

const socialLinksSchema = new Schema(
  {
    facebook: String,
    instagram: String,
    youtube: String,
    linkedin: String,
  },
  {
    _id: false,
  }
);

/*
|--------------------------------------------------------------------------
| Settings Schema
|--------------------------------------------------------------------------
*/

const settingsSchema = new Schema(
  {
    schoolName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    shortName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    logo: {
      type: imageSchema,
      required: true,
    },

    favicon: {
      type: imageSchema,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    alternatePhone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    socialLinks: {
      type: socialLinksSchema,
      default: {},
    },

    googleMapsEmbed: {
      type: String,
      trim: true,
    },

    seo: {
      type: seoSchema,
      required: true,
    },

    copyright: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    websiteStatus: {
      type: String,
      enum: WEBSITE_STATUS,
      default: "ACTIVE",
      index: true,
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

settingsSchema.index({
  websiteStatus: 1,
});

export type SettingsDocument = InferSchemaType<
  typeof settingsSchema
>;

const Settings = model<SettingsDocument>(
  "Settings",
  settingsSchema
);

export default Settings;