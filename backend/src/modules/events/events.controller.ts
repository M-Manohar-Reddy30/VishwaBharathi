import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import EventService from "./events.service.js";

import {
  createEventSchema,
  updateEventSchema,
} from "./events.validation.js";

import { bulkEventSchema } from "./events.bulk.validation.js";
import { reorderEventSchema } from "./events.reorder.validation.js";

import { querySchema } from "../../shared/validators/query.validator.js";

class EventController {

  create = asyncHandler(async (req: Request, res: Response) => {

    const payload = createEventSchema.parse(req.body);

    const event = await EventService.create(payload);

    return ApiResponse.created(
      res,
      event,
      "Event created successfully"
    );

  });

  getStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await EventService.getStats();

    return ApiResponse.success(
      res,
      stats,
      "Event statistics fetched successfully"
    );
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {

    const query = querySchema.parse(req.query);

    const result = await EventService.getPaginated(query);

    return ApiResponse.paginated(
      res,
      result.data,
      result.pagination,
      "Events fetched successfully"
    );

  });

  getPublished = asyncHandler(async (_req: Request, res: Response) => {

    const events = await EventService.getPublished();

    return ApiResponse.success(
      res,
      events,
      "Published events fetched successfully"
    );

  });

  getById = asyncHandler(async (req: Request, res: Response) => {

    const event = await EventService.getById(req.params.id);

    return ApiResponse.success(
      res,
      event,
      "Event fetched successfully"
    );

  });

  update = asyncHandler(async (req: Request, res: Response) => {

    const payload = updateEventSchema.parse(req.body);

    const event = await EventService.update(
      req.params.id,
      payload
    );

    return ApiResponse.success(
      res,
      event,
      "Event updated successfully"
    );

  });

  publish = asyncHandler(async (req: Request, res: Response) => {

    const event = await EventService.publish(req.params.id);

    return ApiResponse.success(
      res,
      event,
      "Event published successfully"
    );

  });

  archive = asyncHandler(async (req: Request, res: Response) => {

    const event = await EventService.archive(req.params.id);

    return ApiResponse.success(
      res,
      event,
      "Event archived successfully"
    );

  });

  trash = asyncHandler(async (req: Request, res: Response) => {

    const event = await EventService.trash(
      req.params.id,
      req.user?.id
    );

    return ApiResponse.success(
      res,
      event,
      "Event moved to trash successfully"
    );

  });

  restore = asyncHandler(async (req: Request, res: Response) => {

    const event = await EventService.restore(req.params.id);

    return ApiResponse.success(
      res,
      event,
      "Event restored successfully"
    );

  });

  forceDelete = asyncHandler(async (req: Request, res: Response) => {

    await EventService.forceDelete(req.params.id);

    return ApiResponse.noContent(
      res,
      "Event permanently deleted successfully"
    );

  });

  getTrash = asyncHandler(async (_req: Request, res: Response) => {

    const events = await EventService.getTrash();

    return ApiResponse.success(
      res,
      events,
      "Trash events fetched successfully"
    );

  });

  reorder = asyncHandler(async (req: Request, res: Response) => {

    const payload = reorderEventSchema.parse(req.body);

    await EventService.reorder(payload);

    return ApiResponse.noContent(
      res,
      "Event order updated successfully"
    );

  });

  bulkPublish = asyncHandler(async (req: Request, res: Response) => {

    const payload = bulkEventSchema.parse(req.body);

    await EventService.bulkPublish(payload);

    return ApiResponse.noContent(
      res,
      "Events published successfully"
    );

  });

  bulkArchive = asyncHandler(async (req: Request, res: Response) => {

    const payload = bulkEventSchema.parse(req.body);

    await EventService.bulkArchive(payload);

    return ApiResponse.noContent(
      res,
      "Events archived successfully"
    );

  });

  bulkTrash = asyncHandler(async (req: Request, res: Response) => {

    const payload = bulkEventSchema.parse(req.body);

    await EventService.bulkTrash(payload);

    return ApiResponse.noContent(
      res,
      "Events moved to trash successfully"
    );

  });

  bulkRestore = asyncHandler(async (req: Request, res: Response) => {

    const payload = bulkEventSchema.parse(req.body);

    await EventService.bulkRestore(payload);

    return ApiResponse.noContent(
      res,
      "Events restored successfully"
    );

  });

  bulkForceDelete = asyncHandler(async (req: Request, res: Response) => {

    const payload = bulkEventSchema.parse(req.body);

    await EventService.bulkForceDelete(payload);

    return ApiResponse.noContent(
      res,
      "Events permanently deleted successfully"
    );

  });

}

export default new EventController();