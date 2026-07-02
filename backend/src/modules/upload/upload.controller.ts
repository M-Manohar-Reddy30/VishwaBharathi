import { Request, Response } from "express";
import fs from "fs";

import { uploadImage } from "../../shared/cloudinary/upload.js";

class UploadController {
  async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const result = await uploadImage(req.file.path, "temp");

      // Delete local file after upload
      fs.unlinkSync(req.file.path);

      return res.status(200).json({
        success: true,
        url: result.secureUrl,
        publicId: result.publicId,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }
  }
}

export default new UploadController();