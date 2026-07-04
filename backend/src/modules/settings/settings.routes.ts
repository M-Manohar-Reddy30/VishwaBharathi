import { Router } from "express";

import SettingsController from "./settings.controller.js";

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
  "/public/settings",
  SettingsController.getPublic
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/settings",
  authenticate,
  authorize("SUPER_ADMIN"),
  SettingsController.get
);

router.put(
  "/admin/settings",
  authenticate,
  authorize("SUPER_ADMIN"),
  SettingsController.save
);

export default router;