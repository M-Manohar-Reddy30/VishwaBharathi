import { Request, Response } from "express";
import fs from "fs";

import { uploadFile } from "../../shared/cloudinary/upload.js";
import ApiResponse from "../../utils/ApiResponse.js";

class UploadController {
  async upload(req: Request, res: Response) {
    if (!req.file) {
      return ApiResponse.error(
        res,
        "No file uploaded.",
        400
      );
    }

    try {
      const file = await uploadFile(
        req.file.path,
        "uploads"
      );

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return ApiResponse.success(
        res,
        file,
        "File uploaded successfully"
      );
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      throw error;
    }
  }

  async uploadMultiple(req: Request, res: Response) {

    if (!req.files || !Array.isArray(req.files)) {
      return ApiResponse.error(
        res,
        "No file uploaded.",          
        400
      );
    }

    const uploadedImages = [];

    try {

        for (const file of req.files) {

            const uploadedFile = await uploadFile(
              file.path,
              "gallery"
            );

            fs.unlinkSync(file.path);

            uploadedImages.push(uploadedFile);

        }

        return ApiResponse.success(
            res,
            uploadedImages,
            "Images uploaded successfully"
        );

    } catch (error) {
        for (const file of req.files) {

            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path); 
          }

        }

        throw error;

      }
  }
}

export default new UploadController();