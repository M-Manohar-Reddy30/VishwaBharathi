import { Router } from "express";

import UploadController from "./upload.controller.js";
import upload from "../../shared/middleware/upload.middleware.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.post(
  "/image",
  authenticate,
  upload.single("image"),
  (req, res) => UploadController.upload(req, res)
);

router.post(
  "/file",
  authenticate,
  upload.single("file"),
  (req, res) =>
    UploadController.uploadDocument(req, res)
);

router.post(
    "/images",
    authenticate,
    upload.array("images", 20),
    (req, res) => UploadController.uploadMultiple(req, res)
);

export default router;