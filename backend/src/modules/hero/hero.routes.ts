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
  "/admin/heroes/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.getTrash
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

/*
|--------------------------------------------------------------------------
| Reorder
|--------------------------------------------------------------------------
*/

router.patch(
  "/admin/heroes/reorder",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.reorder
);

/*
|--------------------------------------------------------------------------
| Bulk Operations
|--------------------------------------------------------------------------
*/

router.patch(
  "/admin/heroes/bulk/publish",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.bulkPublish
);

router.patch(
  "/admin/heroes/bulk/archive",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.bulkArchive
);

router.patch(
  "/admin/heroes/bulk/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.bulkTrash
);

router.patch(
  "/admin/heroes/bulk/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.bulkRestore
);

router.delete(
  "/admin/heroes/bulk/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.bulkForceDelete
);

router.put(
  "/admin/heroes/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.update
);

router.patch(
  "/admin/heroes/:id/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.trash
);

router.patch(
  "/admin/heroes/:id/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.restore
);

router.delete(
  "/admin/heroes/:id/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  HeroController.forceDelete
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