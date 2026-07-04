import { Response } from "express";

export default class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = "Request successful",
    statusCode = 200,
    meta: object | null = null
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
      errors: null,
    });
  }

  static created<T>(
    res: Response,
    data: T,
    message = "Resource created successfully"
  ) {
    return this.success(res, data, message, 201);
  }

  static paginated<T>(
    res: Response,
    data: T,
    pagination: object,
    message = "Data fetched successfully"
  ) {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta: {
        pagination,
      },
      errors: null,
    });
  }

  static noContent(
    res: Response,
    message = "Operation completed successfully"
  ) {
    return res.status(200).json({
      success: true,
      message,
      data: null,
      meta: null,
      errors: null,
    });
  }

  static error(
    res: Response,
    message = "Something went wrong",
    statusCode = 500,
    errors: unknown[] | null = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
      meta: null,
      errors,
    });
  }
}