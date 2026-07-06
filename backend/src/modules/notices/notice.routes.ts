import { Router } from "express";

import NoticeController from "./notice.controller.js";

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
  "/public/notices",
  NoticeController.getActive
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Get all notices
router.get(
  "/admin/notices",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.getAll
);

// Get trash
router.get(
  "/admin/notices/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.getTrash
);

// Reorder (must come before :id)
router.patch(
  "/admin/notices/reorder",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.reorder
);

// Bulk Operations (must come before :id)
router.patch(
  "/admin/notices/bulk/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.bulkTrash
);

router.patch(
  "/admin/notices/bulk/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.bulkRestore
);

router.delete(
  "/admin/notices/bulk/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.bulkForceDelete
);

// Create
router.post(
  "/admin/notices",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.create
);

router.get(
  "/admin/notices/stats",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.getStats
);

// Get by ID
router.get(
  "/admin/notices/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.getById
);

// Update
router.put(
  "/admin/notices/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.update
);

// Move to Trash
router.delete(
  "/admin/notices/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.trash
);

// Restore
router.patch(
  "/admin/notices/:id/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.restore
);

// Permanent Delete
router.delete(
  "/admin/notices/:id/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  NoticeController.forceDelete
);

export default router;