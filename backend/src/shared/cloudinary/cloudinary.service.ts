import cloudinary from "./cloudinary.js";

class CloudinaryService {
  async upload(
    filePath: string,
    folder: string
  ) {
    const result =
      await cloudinary.uploader.upload(filePath, {
        folder: `vbk/${folder}`,
        resource_type: "image",
        overwrite: true,
      });

    return {
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  }

  async delete(publicId: string) {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  }

  async deleteMany(publicIds: string[]) {
    if (!publicIds.length) return;

    await cloudinary.api.delete_resources(publicIds);
  }

  async replace(
    oldPublicId: string,
    newFile: string,
    folder: string
  ) {
    if (oldPublicId) {
      await this.delete(oldPublicId);
    }

    return this.upload(newFile, folder);
  }
}

export default new CloudinaryService();