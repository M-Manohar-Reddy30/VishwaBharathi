import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import HeroService from "./hero.service.js";
import { createHeroSchema } from "./hero.validation.js";

class HeroController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const payload = createHeroSchema.parse(req.body);

    const hero = await HeroService.create(payload);

    return res.status(201).json({
      success: true,
      message: "Hero banner created successfully",
      data: hero,
    });
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const heroes = await HeroService.getAll();

    return res.status(200).json({
      success: true,
      data: heroes,
    });
  });

  getPublished = asyncHandler(async (_req: Request, res: Response) => {
    const heroes = await HeroService.getPublished();

    return res.status(200).json({
      success: true,
      data: heroes,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.getById(req.params.id);

    return res.status(200).json({
      success: true,
      data: hero,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const payload = createHeroSchema.partial().parse(req.body);

    const hero = await HeroService.update(req.params.id, payload);

    return res.status(200).json({
      success: true,
      message: "Hero banner updated successfully",
      data: hero,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await HeroService.delete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Hero banner deleted successfully",
    });
  });

  publish = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.publish(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Hero published successfully",
      data: hero,
    });
  });

  archive = asyncHandler(async (req: Request, res: Response) => {
    const hero = await HeroService.archive(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Hero archived successfully",
      data: hero,
    });
  });
}

export default new HeroController();