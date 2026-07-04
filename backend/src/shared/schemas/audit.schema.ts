import { Schema } from "mongoose";

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

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    _id: false,
  }
);

export default auditSchema;