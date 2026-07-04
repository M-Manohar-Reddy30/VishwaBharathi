import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import AuthService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { AuthRequest } from "./auth.middleware.js";
import ApiResponse from "../../utils/ApiResponse.js";

class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);

    const result = await AuthService.login(body);

    return ApiResponse.success(
      res,
      result,
      "Login successful"
    );
  });

  me = asyncHandler(async (req: AuthRequest, res: Response) => {
    return ApiResponse.success(
      res,
      req.admin,
      "Authenticated"
    );
  });
}

export default new AuthController();