import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import StaffService from "./staff.service.js";

import {
  createStaffSchema,
  updateStaffSchema,
} from "./staff.validation.js";

import { bulkStaffSchema } from "./staff.bulk.validation.js";
import { reorderStaffSchema } from "./staff.reorder.validation.js";

import { querySchema } from "../../shared/validators/query.validator.js";

class StaffController {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  create = asyncHandler(async (req: Request, res: Response) => {
    const payload = createStaffSchema.parse(req.body);

    const staff = await StaffService.create(payload);

    return ApiResponse.created(
      res,
      staff,
      "Staff member created successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Read
  |--------------------------------------------------------------------------
  */

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const query = querySchema.parse(req.query);

    const result = await StaffService.getPaginated(query);

    return ApiResponse.paginated(
      res,
      result.data,
      result.pagination,
      "Staff fetched successfully"
    );
  });

  getActive = asyncHandler(async (_req: Request, res: Response) => {
    const staff = await StaffService.getActive();

    return ApiResponse.success(
      res,
      staff,
      "Active staff fetched successfully"
    );
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const staff = await StaffService.getById(req.params.id);

    return ApiResponse.success(
      res,
      staff,
      "Staff member fetched successfully"
    );
  });

  getTrash = asyncHandler(async (_req: Request, res: Response) => {
    const staff = await StaffService.getTrash();

    return ApiResponse.success(
      res,
      staff,
      "Trash staff fetched successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  update = asyncHandler(async (req: Request, res: Response) => {
    const payload = updateStaffSchema.parse(req.body);

    const staff = await StaffService.update(
      req.params.id,
      payload
    );

    return ApiResponse.success(
      res,
      staff,
      "Staff member updated successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  trash = asyncHandler(async (req: Request, res: Response) => {
    const staff = await StaffService.trash(
      req.params.id,
      req.user?.id
    );

    return ApiResponse.success(
      res,
      staff,
      "Staff member moved to trash successfully"
    );
  });

  restore = asyncHandler(async (req: Request, res: Response) => {
    const staff = await StaffService.restore(
      req.params.id
    );

    return ApiResponse.success(
      res,
      staff,
      "Staff member restored successfully"
    );
  });

  forceDelete = asyncHandler(async (req: Request, res: Response) => {
    await StaffService.forceDelete(req.params.id);

    return ApiResponse.noContent(
      res,
      "Staff member permanently deleted successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Reorder
  |--------------------------------------------------------------------------
  */

  reorder = asyncHandler(async (req: Request, res: Response) => {
    const payload = reorderStaffSchema.parse(req.body);

    await StaffService.reorder(payload);

    return ApiResponse.noContent(
      res,
      "Staff order updated successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Bulk Operations
  |--------------------------------------------------------------------------
  */

  bulkTrash = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkStaffSchema.parse(req.body);

    await StaffService.bulkTrash(payload);

    return ApiResponse.noContent(
      res,
      "Staff moved to trash successfully"
    );
  });

  bulkRestore = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkStaffSchema.parse(req.body);

    await StaffService.bulkRestore(payload);

    return ApiResponse.noContent(
      res,
      "Staff restored successfully"
    );
  });

  bulkForceDelete = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkStaffSchema.parse(req.body);

    await StaffService.bulkForceDelete(payload);

    return ApiResponse.noContent(
      res,
      "Staff permanently deleted successfully"
    );
  });
}

export default new StaffController();