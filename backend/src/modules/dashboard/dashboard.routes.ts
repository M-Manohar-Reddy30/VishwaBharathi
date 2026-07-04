import { Router } from "express";

import DashboardController from "./dashboard.controller.js";
import {
  authenticate,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();

router.get(
  "/admin/dashboard/stats",
  authenticate,
  authorize("SUPER_ADMIN"),
  DashboardController.getStats
);

router.get(
    "/admin/dashboard/recent-activities",
    authenticate,
    authorize("SUPER_ADMIN"),
    DashboardController.getRecentActivities
);

export default router;