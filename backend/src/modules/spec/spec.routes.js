import express from "express";
import { body } from "express-validator";
import {
  createSpec,
  getRecentSpecs,
  exportMarkdown,
} from "./spec.controller.js";
import { generateLimiter } from "../../middleware/rateLimit.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

const router = express.Router();

router.post(
  "/",
  generateLimiter,
  [
    body("goal").notEmpty(),
    body("users").notEmpty(),
    body("templateType").notEmpty(),
  ],
  validate,
  createSpec
);

router.get("/recent", getRecentSpecs);
router.get("/:id/export", exportMarkdown);

export default router;
