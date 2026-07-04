import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import SettingsService from "./settings.service.js";
import {
  createSettingsSchema,
} from "./settings.validation.js";

class SettingsController {
  /*
  |--------------------------------------------------------------------------
  | Save Settings
  |--------------------------------------------------------------------------
  */

  save = asyncHandler(async (req: Request, res: Response) => {
    const payload = createSettingsSchema.parse(req.body);

    const settings = await SettingsService.save(payload);

    return ApiResponse.success(
      res,
      settings,
      "Website settings saved successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Admin
  |--------------------------------------------------------------------------
  */

  get = asyncHandler(async (_req: Request, res: Response) => {
    const settings =
      await SettingsService.getSettings();

    return ApiResponse.success(
      res,
      settings,
      "Website settings fetched successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Public
  |--------------------------------------------------------------------------
  */

  getPublic = asyncHandler(async (_req: Request, res: Response) => {
    const settings =
      await SettingsService.getActiveSettings();

    return ApiResponse.success(
      res,
      settings,
      "Website settings fetched successfully"
    );
  });
}

export default new SettingsController();