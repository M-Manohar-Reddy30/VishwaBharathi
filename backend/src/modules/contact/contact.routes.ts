import { Router } from "express";

import ContactController from "./contact.controller.js";

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

router.post(
  "/public/contact",
  ContactController.create
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/contact",
  authenticate,
  authorize("SUPER_ADMIN"),
  ContactController.getAll
);

router.get(
  "/admin/contact/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  ContactController.getById
);

router.patch(
  "/admin/contact/:id/status",
  authenticate,
  authorize("SUPER_ADMIN"),
  ContactController.updateStatus
);

router.delete(
  "/admin/contact/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  ContactController.delete
);

export default router;