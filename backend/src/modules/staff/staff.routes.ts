import { Router } from "express";

import StaffController from "./staff.controller.js";

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
  "/public/staff",
  StaffController.getActive
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

// ===========================
// General Routes
// ===========================

router.get(
  "/admin/staff",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.getAll
);

router.post(
  "/admin/staff",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.create
);

router.get(
  "/admin/staff/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.getTrash
);

// ===========================
// Static Routes (IMPORTANT)
// These MUST come BEFORE :id routes
// ===========================

router.patch(
  "/admin/staff/reorder",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.reorder
);

router.patch(
  "/admin/staff/bulk/trash",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.bulkTrash
);

router.patch(
  "/admin/staff/bulk/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.bulkRestore
);

router.delete(
  "/admin/staff/bulk/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.bulkForceDelete
);

// ===========================
// Dynamic Routes
// ===========================

router.get(
  "/admin/staff/stats",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.getStats
);

router.get(
  "/admin/staff/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.getById
);

router.put(
  "/admin/staff/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.update
);

router.delete(
  "/admin/staff/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.trash
);

router.patch(
  "/admin/staff/:id/restore",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.restore
);

router.delete(
  "/admin/staff/:id/force",
  authenticate,
  authorize("SUPER_ADMIN"),
  StaffController.forceDelete
);

export default router;