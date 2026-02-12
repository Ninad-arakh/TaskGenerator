import express from "express";
import { createSpec, exportMarkdown, getRecentSpecs } from "./spec.controller.js";
import { generateLimiter } from "../../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/", createSpec);
router.post("/", generateLimiter, createSpec);
router.get("/recent", getRecentSpecs);
router.get("/:id/export", exportMarkdown);


export default router;
