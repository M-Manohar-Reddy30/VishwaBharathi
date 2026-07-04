import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import ApiError from "../errors/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (error instanceof ZodError) {

    return ApiResponse.error(
      res,
      "Validation Failed",
      400,
      error.issues
    );

  }

  if (error instanceof ApiError) {

    return ApiResponse.error(
      res,
      error.message,
      error.statusCode
    );

  }

  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  return ApiResponse.error(
    res,
    "Internal Server Error",
    500
  );

};

export default errorMiddleware;