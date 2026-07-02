import cloudinary from "./cloudinary.js";

export const deleteImage = async (
  publicId: string
) => {
  await cloudinary.uploader.destroy(publicId);
};