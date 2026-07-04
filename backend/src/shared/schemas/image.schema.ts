import { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    publicId: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: "",
    },

    width: Number,

    height: Number,

    format: String,

    bytes: Number,
  },
  {
    _id: false,
  }
);

export default imageSchema;