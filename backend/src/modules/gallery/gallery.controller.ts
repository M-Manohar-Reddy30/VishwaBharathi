import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import GalleryService from "./gallery.service.js";

import {
  createGallerySchema,
  updateGallerySchema,
} from "./gallery.validation.js";

import { bulkGallerySchema } from "./gallery.bulk.validation.js";
import { reorderGallerySchema } from "./gallery.reorder.validation.js";
import { querySchema } from "../../shared/validators/query.validator.js";

class GalleryController {

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  create = asyncHandler(async (req: Request, res: Response) => {

    const payload = createGallerySchema.parse(req.body);

    const gallery = await GalleryService.create(payload);

    return ApiResponse.created(
      res,
      gallery,
      "Gallery image created successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Get All
  |--------------------------------------------------------------------------
  */

  getAll = asyncHandler(async (req: Request, res: Response) => {

    const query = querySchema.parse(req.query);

    const result =
      await GalleryService.getPaginated(query);

    return ApiResponse.paginated(
      res,
      result.data,
      result.pagination,
      "Gallery images fetched successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Get By Id
  |--------------------------------------------------------------------------
  */

  getById = asyncHandler(async (req: Request, res: Response) => {

    const gallery =
      await GalleryService.getById(req.params.id);

    return ApiResponse.success(
      res,
      gallery,
      "Gallery image fetched successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  update = asyncHandler(async (req: Request, res: Response) => {

    const payload =
      updateGallerySchema.parse(req.body);

    const gallery =
      await GalleryService.update(
        req.params.id,
        payload
      );

    return ApiResponse.success(
      res,
      gallery,
      "Gallery image updated successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Trash
  |--------------------------------------------------------------------------
  */

  trash = asyncHandler(async (req: Request, res: Response) => {

    const gallery =
      await GalleryService.trash(
        req.params.id,
        req.user?.id
      );

    return ApiResponse.success(
      res,
      gallery,
      "Gallery image moved to trash successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Restore
  |--------------------------------------------------------------------------
  */

  restore = asyncHandler(async (req: Request, res: Response) => {

    const gallery =
      await GalleryService.restore(
        req.params.id
      );

    return ApiResponse.success(
      res,
      gallery,
      "Gallery image restored successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Force Delete
  |--------------------------------------------------------------------------
  */

  forceDelete = asyncHandler(async (req: Request, res: Response) => {

    await GalleryService.forceDelete(
      req.params.id
    );

    return ApiResponse.noContent(
      res,
      "Gallery image permanently deleted successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Trash List
  |--------------------------------------------------------------------------
  */

  getTrash = asyncHandler(async (_req: Request, res: Response) => {

    const gallery =
      await GalleryService.getTrash();

    return ApiResponse.success(
      res,
      gallery,
      "Trash gallery fetched successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Bulk Trash
  |--------------------------------------------------------------------------
  */

  bulkTrash = asyncHandler(async (req: Request, res: Response) => {

    const payload =
      bulkGallerySchema.parse(req.body);

    await GalleryService.bulkTrash(payload);

    return ApiResponse.noContent(
      res,
      "Gallery images moved to trash successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Bulk Restore
  |--------------------------------------------------------------------------
  */

  bulkRestore = asyncHandler(async (req: Request, res: Response) => {

    const payload =
      bulkGallerySchema.parse(req.body);

    await GalleryService.bulkRestore(payload);

    return ApiResponse.noContent(
      res,
      "Gallery images restored successfully"
    );

  });

  /*
  |--------------------------------------------------------------------------
  | Bulk Delete
  |--------------------------------------------------------------------------
  */

  bulkForceDelete = asyncHandler(async (req: Request, res: Response) => {

    const payload =
      bulkGallerySchema.parse(req.body);

    await GalleryService.bulkForceDelete(payload);

    return ApiResponse.noContent(
      res,
      "Gallery images permanently deleted successfully"
    );

  });

  reorder = asyncHandler(async (req: Request, res: Response) => {

    const payload =
        reorderGallerySchema.parse(req.body);

    await GalleryService.reorder(
        payload.images
    );

    return ApiResponse.noContent(
        res,
        "Gallery reordered successfully"
    );
  });

}

export default new GalleryController();