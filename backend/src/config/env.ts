import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  MONGODB_URI: process.env.MONGODB_URI || "",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",

  JWT_ACCESS_EXPIRES:
  process.env.JWT_ACCESS_EXPIRES || "15m",

  JWT_REFRESH_EXPIRES:
  process.env.JWT_REFRESH_EXPIRES || "7d",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

  ADMIN_URL: process.env.ADMIN_URL || "http://localhost:3001",

  ADMIN_NAME: process.env.ADMIN_NAME || "",

  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",

  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export default env;