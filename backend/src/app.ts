import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import errorMiddleware from "./shared/middleware/error.middleware.js";
import routes from "./routes/index.js";
import ApiResponse from "./utils/ApiResponse.js";
import apiLimiter from "./shared/middleware/rateLimit.middleware.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      process.env.ADMIN_URL || "http://localhost:3001",
    ],
    credentials: true,
  })
);

app.use(hpp());

app.use(compression());

app.use(apiLimiter);

app.use(express.json({ limit: "20mb" }));

app.use(express.urlencoded({ extended: true, limit:"20mb" }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (_req, res) => {
  return ApiResponse.success(
    res,
    null,
    "Welcome to Vishwa Bharathi Platform API"
  );
});

app.use("/api/v1", routes);

app.use((_req, res) => {
  return ApiResponse.error(
    res,
    "Route Not Found",
    404
  );
});

app.use(errorMiddleware);

export default app;