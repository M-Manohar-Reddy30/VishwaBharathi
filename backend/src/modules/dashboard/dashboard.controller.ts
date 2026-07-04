import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import DashboardService from "./dashboard.service.js";

class DashboardController {
  getStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await DashboardService.getStats();

    return ApiResponse.success(
      res,
      stats,
      "Dashboard statistics fetched successfully"
    );
  });

  getRecentActivities = asyncHandler(async (_req, res) => {

        const activities =
            await DashboardService.getRecentActivities();

        return ApiResponse.success(
            res,
            activities,
            "Recent activities fetched successfully"
        );

    });
}

export default new DashboardController();