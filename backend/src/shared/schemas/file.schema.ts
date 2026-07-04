import { Schema } from "mongoose";

const fileSchema = new Schema(
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

export default fileSchema;