import express from "express";
import cors from "cors";
import { globalLimiter } from "./middleware/rateLimit.middleware.js";

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());
app.use(globalLimiter);

app.get("/", (req, res) => {
  res.json({ message: "Task Generator API running" });
});

export default app;
