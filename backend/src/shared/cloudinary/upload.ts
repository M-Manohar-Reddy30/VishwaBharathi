import cloudinary from "./cloudinary.js";
import path from "path";

export interface UploadResult {
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  format: string;
  bytes: number;
  resourceType: string;
}

export const uploadFile = async (
  filePath: string,
  folder: string
): Promise<UploadResult> => {

  const extension = path
    .extname(filePath)
    .toLowerCase();

  const resourceType =
    extension === ".pdf"
      ? "raw"
      : "image";

  const result =
    await cloudinary.uploader.upload(
      filePath,
      {
        folder: `vbk/${folder}`,
        resource_type: resourceType,
        overwrite: true,
      }
    );

  return {
    publicId: result.public_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,

    // Cloudinary may not return format for raw files
    format:
      result.format ??
      extension.replace(".", ""),

    bytes: result.bytes,
    resourceType: result.resource_type,
  };
};