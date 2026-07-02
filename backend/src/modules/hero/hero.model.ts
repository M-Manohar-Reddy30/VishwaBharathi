import { Schema, InferSchemaType, model } from "mongoose";

import {
  HERO_BUTTON_TARGET,
  HERO_BUTTON_VARIANT,
  HERO_STATUS,
  HERO_TEXT_ALIGN,
} from "./hero.constants.js";

const imageSchema = new Schema(
  {
    publicId: { type: String, required: true },

    url: { type: String, required: true },

    alt: { type: String, default: "" },

    width: Number,

    height: Number,

    format: String,

    bytes: Number,
  },
  {
    _id: false,
  }
);

const buttonSchema = new Schema(
  {
    text: String,

    url: String,

    target: {
      type: String,
      enum: HERO_BUTTON_TARGET,
      default: "_self",
    },

    variant: {
      type: String,
      enum: HERO_BUTTON_VARIANT,
      default: "primary",
    },
  },
  {
    _id: false,
  }
);

const seoSchema = new Schema(
  {
    metaTitle: String,

    metaDescription: String,

    keywords: [String],

    canonicalUrl: String,

    ogImage: String,
  },
  {
    _id: false,
  }
);

const auditSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    _id: false,
  }
);

const heroSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    subtitle: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 600,
    },

    desktopImage: {
      type: imageSchema,
      required: true,
    },

    mobileImage: {
      type: imageSchema,
      required: true,
    },

    primaryButton: buttonSchema,

    secondaryButton: buttonSchema,

    overlayOpacity: {
      type: Number,
      default: 40,
      min: 0,
      max: 100,
    },

    textAlign: {
      type: String,
      enum: HERO_TEXT_ALIGN,
      default: "left",
    },

    displayOrder: {
      type: Number,
      default: 1,
      index: true,
    },

    status: {
      type: String,
      enum: HERO_STATUS,
      default: "DRAFT",
      index: true,
    },

    publishedAt: Date,

    expiresAt: Date,

    seo: seoSchema,

    audit: auditSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

heroSchema.index({
  status: 1,
  displayOrder: 1,
});

heroSchema.index({
  publishedAt: 1,
});

heroSchema.index({
  expiresAt: 1,
});

export type HeroDocument = InferSchemaType<typeof heroSchema>;

const HeroBanner = model<HeroDocument>("HeroBanner", heroSchema);

export default HeroBanner;