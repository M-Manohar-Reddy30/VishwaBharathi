import cloudinary from "./cloudinary.js";

interface UploadResult {
  publicId: string;
  secureUrl: string;
}

export const uploadImage = async (
  filePath: string,
  folder: string
): Promise<UploadResult> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `vbk/${folder}`,
    resource_type: "image",
    overwrite: true,
  });

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
  };
};