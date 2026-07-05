import { Router } from "express";

import GalleryController from "./gallery.controller.js";
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
  "/public/gallery",
  GalleryController.getAll
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Get All
router.get(
  "/admin/gallery",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.getAll
);

// Create
router.post(
  "/admin/gallery",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.create
);

/*
|--------------------------------------------------------------------------
| Special Routes (MUST COME BEFORE :id ROUTES)
|--------------------------------------------------------------------------
*/

// Trash List
router.get(
  "/admin/gallery/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.getTrash
);

// Reorder
router.patch(
  "/admin/gallery/reorder",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.reorder
);

/*
|--------------------------------------------------------------------------
| Bulk Routes (MUST COME BEFORE :id ROUTES)
|--------------------------------------------------------------------------
*/

router.patch(
  "/admin/gallery/bulk/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.bulkTrash
);

router.patch(
  "/admin/gallery/bulk/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.bulkRestore
);

router.delete(
  "/admin/gallery/bulk/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.bulkForceDelete
);

/*
|--------------------------------------------------------------------------
| ID Routes (KEEP THESE LAST)
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/gallery/stats",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.stats
);

// Get By Id
router.get(
  "/admin/gallery/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.getById
);

// Update
router.put(
  "/admin/gallery/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.update
);

// Move to Trash
router.delete(
  "/admin/gallery/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.trash
);

// Restore
router.patch(
  "/admin/gallery/:id/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.restore
);

// Permanent Delete
router.delete(
  "/admin/gallery/:id/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  GalleryController.forceDelete
);

export default router;