import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();

router.get("/", (_req, res) => {
  return res.status(200).json(
    ApiResponse.success("Backend Running Successfully", {
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    })
  );
});

export default router;