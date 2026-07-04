import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import AdmissionService from "./admission.service.js";
import {
  createAdmissionSchema,
} from "./admission.validation.js";

class AdmissionController {
  /*
  |--------------------------------------------------------------------------
  | Save Admission
  |--------------------------------------------------------------------------
  */

  save = asyncHandler(async (req: Request, res: Response) => {
    const payload = createAdmissionSchema.parse(req.body);

    const admission = await AdmissionService.save(payload);

    return ApiResponse.success(
      res,
      admission,
      "Admission page saved successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Admin
  |--------------------------------------------------------------------------
  */

  get = asyncHandler(async (_req: Request, res: Response) => {
    const admission =
      await AdmissionService.getAdmission();

    return ApiResponse.success(
      res,
      admission,
      "Admission page fetched successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Public
  |--------------------------------------------------------------------------
  */

  getPublic = asyncHandler(async (_req: Request, res: Response) => {
    const admission =
      await AdmissionService.getActiveAdmission();

    return ApiResponse.success(
      res,
      admission,
      "Admission page fetched successfully"
    );
  });
}

export default new AdmissionController();