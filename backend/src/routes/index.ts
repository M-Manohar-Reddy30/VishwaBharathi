import { Router } from "express";

import authRoute from "../modules/auth/auth.routes.js";
import heroRoute from "../modules/hero/hero.routes.js";
import uploadRoute from "../modules/upload/upload.routes.js";
import healthRoute from "./health.route.js";

const router = Router();

router.use(authRoute);

router.use(uploadRoute);

router.use(heroRoute);

router.use("/health", healthRoute);

export default router;