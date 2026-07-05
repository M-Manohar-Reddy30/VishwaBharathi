import { Router } from "express";

import EventController from "./events.controller.js";
import {
  authenticate,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/public/events",
  EventController.getPublished
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Get all events
router.get(
  "/admin/events",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.getAll
);

// Trash
router.get(
  "/admin/events/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.getTrash
);

// Reorder
router.patch(
  "/admin/events/reorder",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.reorder
);

/*
|--------------------------------------------------------------------------
| Bulk Operations
|--------------------------------------------------------------------------
*/

router.patch(
  "/admin/events/bulk/publish",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.bulkPublish
);

router.patch(
  "/admin/events/bulk/archive",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.bulkArchive
);

router.patch(
  "/admin/events/bulk/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.bulkTrash
);

router.patch(
  "/admin/events/bulk/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.bulkRestore
);

router.delete(
  "/admin/events/bulk/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.bulkForceDelete
);

/*
|--------------------------------------------------------------------------
| Single Event Operations
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/events/stats",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.getStats
);

router.get(
  "/admin/events/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.getById
);

router.post(
  "/admin/events",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.create
);

router.put(
  "/admin/events/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.update
);

router.delete(
  "/admin/events/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.trash
);

router.patch(
  "/admin/events/:id/publish",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.publish
);

router.patch(
  "/admin/events/:id/archive",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.archive
);

router.patch(
  "/admin/events/:id/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.restore
);

router.delete(
  "/admin/events/:id/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  EventController.forceDelete
);

export default router;