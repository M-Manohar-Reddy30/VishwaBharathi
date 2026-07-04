import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { env } from "../../config/env.js";
import ApiResponse from "../../utils/ApiResponse.js";

export interface AuthRequest extends Request {
  admin?: JwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return ApiResponse.error(
      res,
      "Unauthorized",
      401
    );
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET
    ) as JwtPayload;

    req.admin = decoded;

    next();
  } catch {
    return ApiResponse.error(
      res,
      "Invalid or Expired Token",
      401
    );
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return ApiResponse.error(
        res,
        "Unauthorized",
        401
      );
    }

    if (!roles.includes(req.admin.role)) {
      return ApiResponse.error(
        res,
        "Forbidden",
        401
      );
    }

    next();
  };
};