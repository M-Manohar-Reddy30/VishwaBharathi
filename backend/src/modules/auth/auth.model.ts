import { Schema, model } from "mongoose";

export interface IAdmin {
  fullName: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN";
  isActive: boolean;
  lastLogin?: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      default: "SUPER_ADMIN",
      enum: ["SUPER_ADMIN"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Admin = model<IAdmin>("Admin", adminSchema);

export default Admin;