import { Router } from "express";

import HeroController from "./hero.controller.js";
import {
  authenticate,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get(
  "/public/heroes",
  HeroController.getPublished
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/heroes",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.getAll
);

router.get(
  "/admin/heroes/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.getById
);

router.post(
  "/admin/heroes",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.create
);

router.put(
  "/admin/heroes/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.update
);

router.delete(
  "/admin/heroes/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.delete
);

router.patch(
  "/admin/heroes/:id/publish",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.publish
);

router.patch(
  "/admin/heroes/:id/archive",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.archive
);

export default router;