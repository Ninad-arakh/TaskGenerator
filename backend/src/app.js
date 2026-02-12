import express from "express";
import cors from "cors";
import morgan from "morgan";
import specRoutes from "./modules/spec/spec.routes.js";
import healthRoutes from "./modules/health/health.routes.js";
import { globalLimiter } from "./middleware/rateLimit.middleware.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));
app.use(globalLimiter);

app.use("/api/health", healthRoutes);
app.use("/api/specs", specRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
