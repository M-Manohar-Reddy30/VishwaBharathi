import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import HeroService from "./hero.service.js";
import { bulkHeroSchema } from "./hero.bulk.validation.js";
import { createHeroSchema } from "./hero.validation.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { querySchema } from "../../shared/validators/query.validator.js";
import { reorderHeroSchema } from "./hero.reorder.validation.js";

class HeroController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const payload = createHeroSchema.parse(req.body);

    const hero = await HeroService.create(payload);

    return ApiResponse.created(
      res,
      hero,
      "Hero banner created successfully"
    );
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const query = querySchema.parse(req.query);

    const result = await HeroService.getPaginated(query);

    return ApiResponse.paginated(
      res,
      result.data,
      result.pagination,
      "Heroes fetched successfully"
    );
  });

  getPublished = asyncHandler(async (_req: Request, res: Response) => {
    const heroes = await HeroService.getPublished();

    return ApiResponse.success(
        res,
        heroes,
        "Published heroes fetched successfully"
    );
  });

  stats = asyncHandler(async (_req: Request, res: Response) => {

    const stats = await HeroService.getStats();

    return ApiResponse.success(
      res,
      stats,
      "Hero statistics fetched successfully"
    );

  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.getById(req.params.id);

    return ApiResponse.success(
      res,
      hero,
      "Hero fetched successfully"
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const payload = createHeroSchema.partial().parse(req.body);

    const hero = await HeroService.update(req.params.id, payload);

    return ApiResponse.success(
      res,
      hero,
      "Hero banner updated successfully"
    );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.trash(req.params.id);

    return ApiResponse.success(
      res,
      hero,
      "Hero moved to trash successfully"
    );
  });

  publish = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.publish(req.params.id);

    return ApiResponse.success(
      res,
      hero,
      "Hero published successfully"
    );
  });

  archive = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.archive(req.params.id);

    return ApiResponse.success(
      res,
      hero,
      "Hero archived successfully"
    );
  });

  trash = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.trash(
      req.params.id,
      req.user?.id
    );

    return ApiResponse.success(
      res,
      hero,
      "Hero moved to trash successfully"
    );
  });

  restore = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.restore(req.params.id);

    return ApiResponse.success(
      res,
      hero,
      "Hero restored successfully"
    );
  });

  forceDelete = asyncHandler(async (req: Request, res: Response) => {
    await HeroService.forceDelete(req.params.id);

    return ApiResponse.noContent(
      res,
      "Hero permanently deleted successfully"
    );
  });

  getTrash = asyncHandler(async (_req: Request, res: Response) => {
    const heroes = await HeroService.getTrash();

    return ApiResponse.success(
      res,
      heroes,
      "Trash heroes fetched successfully"
    );
  });

  bulkPublish = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkHeroSchema.parse(req.body);

    await HeroService.bulkPublish(payload);

    return ApiResponse.noContent(
      res,
      "Heroes published successfully"
    );
  });

  bulkArchive = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkHeroSchema.parse(req.body);

    await HeroService.bulkArchive(payload);

    return ApiResponse.noContent(
      res,
      "Heroes archived successfully"
    );
  });

  bulkTrash = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkHeroSchema.parse(req.body);

    await HeroService.bulkTrash(payload);

    return ApiResponse.noContent(
      res,
      "Heroes moved to trash successfully"
    );
  });

  bulkRestore = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkHeroSchema.parse(req.body);

    await HeroService.bulkRestore(payload);

    return ApiResponse.noContent(
      res,
      "Heroes restored successfully"
    );
  });

  bulkForceDelete = asyncHandler(async (req: Request, res: Response) => {
    const payload = bulkHeroSchema.parse(req.body);

    await HeroService.bulkForceDelete(payload);

    return ApiResponse.noContent(
      res,
      "Heroes permanently deleted successfully"
    );
  });

  reorder = asyncHandler(async (req, res) => {

    const payload =
        reorderHeroSchema.parse(req.body);

    await HeroService.reorder(payload);

    return ApiResponse.noContent(
        res,
        "Hero order updated successfully"
    );
  });

}

export default new HeroController();