import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import NoticeService from "./notice.service.js";

import {
  createNoticeSchema,
  updateNoticeSchema,
} from "./notice.validation.js";

import { bulkNoticeSchema } from "./notice.bulk.validation.js";
import { reorderNoticeSchema } from "./notice.reorder.validation.js";

import { querySchema } from "../../shared/validators/query.validator.js";

class NoticeController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const payload = createNoticeSchema.parse(req.body);

    const notice = await NoticeService.create(payload);

    return ApiResponse.created(
      res,
      notice,
      "Notice created successfully"
    );
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const query = querySchema.parse(req.query);

    const result = await NoticeService.getPaginated(query);

    return ApiResponse.paginated(
      res,
      result.data,
      result.pagination,
      "Notices fetched successfully"
    );
  });

  getActive = asyncHandler(async (_req: Request, res: Response) => {
    const notices = await NoticeService.getActive();

    return ApiResponse.success(
      res,
      notices,
      "Active notices fetched successfully"
    );
  });

  getStats = asyncHandler(async (_req, res) => {

    const stats =
      await NoticeService.getStats();

    return ApiResponse.success(
      res,
      stats,
      "Notice statistics fetched successfully"
    );

  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const notice = await NoticeService.getById(req.params.id);

    return ApiResponse.success(
      res,
      notice,
      "Notice fetched successfully"
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const payload = updateNoticeSchema.parse(req.body);

    const notice = await NoticeService.update(
      req.params.id,
      payload
    );

    return ApiResponse.success(
      res,
      notice,
      "Notice updated successfully"
    );
  });

  trash = asyncHandler(async (req: Request, res: Response) => {
    const notice = await NoticeService.trash(
      req.params.id,
      req.admin?.id
    );

    return ApiResponse.success(
      res,
      notice,
      "Notice moved to trash successfully"
    );
  });

  restore = asyncHandler(async (req: Request, res: Response) => {
    const notice = await NoticeService.restore(req.params.id);

    return ApiResponse.success(
      res,
      notice,
      "Notice restored successfully"
    );
  });

  forceDelete = asyncHandler(async (req: Request, res: Response) => {
    await NoticeService.forceDelete(req.params.id);

    return ApiResponse.noContent(
      res,
      "Notice permanently deleted successfully"
    );
  });

  getTrash = asyncHandler(async (_req: Request, res: Response) => {
    const notices = await NoticeService.getTrash();

    return ApiResponse.success(
      res,
      notices,
      "Trash notices fetched successfully"
    );
  });

  reorder = asyncHandler(async (req: Request, res: Response) => {
    const payload = reorderNoticeSchema.parse(req.body);

    await NoticeService.reorder(payload);

    return ApiResponse.noContent(
      res,
      "Notice order updated successfully"
    );
  });

  bulkTrash = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkNoticeSchema.parse(req.body);

    await NoticeService.bulkTrash(payload);

    return ApiResponse.noContent(
      res,
      "Notices moved to trash successfully"
    );
  });

  bulkRestore = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkNoticeSchema.parse(req.body);

    await NoticeService.bulkRestore(payload);

    return ApiResponse.noContent(
      res,
      "Notices restored successfully"
    );
  });

  bulkForceDelete = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkNoticeSchema.parse(req.body);

    await NoticeService.bulkForceDelete(payload);

    return ApiResponse.noContent(
      res,
      "Notices permanently deleted successfully"
    );
  });
}

export default new NoticeController();