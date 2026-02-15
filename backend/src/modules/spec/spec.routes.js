import express from "express";
import { body } from "express-validator";
import {
  createSpec,
  getRecentSpecs,
  exportMarkdown,
  editTask,
  groupTasks,
  reorderTasks,
  getSpecById,
  deleteTask,
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
  createSpec,
);

// Reorder tasks
router.patch("/:specId/tasks/reorder", reorderTasks);

// Group tasks
router.patch("/:specId/tasks/group", groupTasks);

// Edit single task
router.patch("/:specId/tasks/:taskId", editTask);

// Delete a task
router.delete("/:specId/tasks/:taskId", deleteTask);

router.get("/recent", getRecentSpecs);
router.get("/:id", getSpecById);

router.get("/:id/export", exportMarkdown);

export default router;
