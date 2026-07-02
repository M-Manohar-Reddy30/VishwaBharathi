import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import AuthService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { AuthRequest } from "./auth.middleware.js";

class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);

    const result = await AuthService.login(body);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  });

  me = asyncHandler(async (req: AuthRequest, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Authenticated",
      data: req.admin,
    });
  });
}

export default new AuthController();