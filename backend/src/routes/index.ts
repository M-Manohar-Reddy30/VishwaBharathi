import { Router } from "express";

import authRoute from "../modules/auth/auth.routes.js";
import heroRoute from "../modules/hero/hero.routes.js";
import uploadRoute from "../modules/upload/upload.routes.js";
import healthRoute from "./health.route.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import galleryRoutes from "../modules/gallery/gallery.routes.js";
import eventRoutes from "../modules/events/events.routes.js";
import staffRoutes from "../modules/staff/staff.routes.js";
import noticeRoutes from "../modules/notices/notice.routes.js";
import admissionRoutes from "../modules/admissions/admission.routes.js";
import contactRoutes from "../modules/contact/contact.routes.js";
import settingsRoutes from "../modules/settings/settings.routes.js";

const router = Router();

router.use("/health", healthRoute);

router.use("/auth", authRoute);

router.use(uploadRoute);

router.use(heroRoute);

router.use(dashboardRoutes);

router.use(galleryRoutes);

router.use(eventRoutes);

router.use(staffRoutes);

router.use(noticeRoutes);

router.use(admissionRoutes);

router.use(contactRoutes);

router.use(settingsRoutes);

export default router;