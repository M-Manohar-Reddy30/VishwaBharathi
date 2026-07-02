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

export default router;