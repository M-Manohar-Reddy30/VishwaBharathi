import { Schema, InferSchemaType, model } from "mongoose";

import { CONTACT_STATUS } from "./contact.constants.js";

/*
|--------------------------------------------------------------------------
| Contact Schema
|--------------------------------------------------------------------------
*/

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: CONTACT_STATUS,
      default: "UNREAD",
      index: true,
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

contactSchema.index({
  status: 1,
  createdAt: -1,
});

contactSchema.index({
  name: "text",
  email: "text",
  subject: "text",
  message: "text",
});

export type ContactDocument = InferSchemaType<
  typeof contactSchema
>;

const Contact = model<ContactDocument>(
  "Contact",
  contactSchema
);

export default Contact;