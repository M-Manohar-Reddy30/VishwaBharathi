import { Router } from "express";

import AdmissionController from "./admission.controller.js";

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
  "/public/admissions",
  AdmissionController.getPublic
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/admissions",
  authenticate,
  authorize("SUPER_ADMIN"),
  AdmissionController.get
);

router.put(
  "/admin/admissions",
  authenticate,
  authorize("SUPER_ADMIN"),
  AdmissionController.save
);

export default router;