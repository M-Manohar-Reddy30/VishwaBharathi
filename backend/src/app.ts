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

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (_req, res) => {
  return res.json(
    ApiResponse.success("Welcome to Vishwa Bharathi Platform API")
  );
});

app.use("/api/v1", routes);

app.use((_req, res) => {
  return res.status(404).json(
    ApiResponse.error("Route Not Found")
  );
});

app.use(errorMiddleware);

export default app;