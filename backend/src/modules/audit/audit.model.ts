import { InferSchemaType, Schema, model } from "mongoose";

const auditSchema = new Schema(
  {
    module: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    resourceId: {
      type: Schema.Types.ObjectId,
    },

    resourceName: String,

    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },

    ip: String,

    userAgent: String,

    metadata: {
        type: Schema.Types.Mixed,
        default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type AuditDocument =
  InferSchemaType<typeof auditSchema>;

export default model<AuditDocument>(
  "AuditLog",
  auditSchema
);