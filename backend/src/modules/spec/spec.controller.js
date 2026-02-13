import Spec from "./spec.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateSpec } from "../../services/gemini.service.js";

export const createSpec = asyncHandler(async (req, res) => {
  const { goal, users, constraints, templateType } = req.body;

  const output = await generateSpec({
    goal,
    users,
    constraints,
    templateType,
  });

  const spec = await Spec.create({
    goal,
    users,
    constraints,
    templateType,
    output,
  });

  res.status(201).json({
    success: true,
    data: spec,
  });
});

export const getRecentSpecs = asyncHandler(async (req, res) => {
  const specs = await Spec.find().sort({ createdAt: -1 }).limit(10);

  res.json({ success: true, data: specs });
});

export const exportMarkdown = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  res.setHeader("Content-Type", "text/markdown");
  res.send(spec.markdown);
});

// ✏️ Edit Task
export const editTask = asyncHandler(async (req, res) => {
  const { specId, taskId } = req.params;
  const updates = req.body;

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  const task = spec.output.tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, updates);

  await spec.save();

  res.json({ success: true, data: spec });
});

// 🔁 Reorder Tasks
export const reorderTasks = asyncHandler(async (req, res) => {
  const { specId } = req.params;
  const { orderedTaskIds } = req.body;
  // ["task-3", "task-1", "task-2"]

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  const reordered = orderedTaskIds
    .map((id, index) => {
      const task = spec.output.tasks.find((t) => t.id === id);
      if (task) {
        task.order = index + 1;
      }
      return task;
    })
    .filter(Boolean);

  spec.output.tasks = reordered;

  await spec.save();

  res.json({ success: true, data: spec });
});

// 📦 Group Tasks
export const groupTasks = asyncHandler(async (req, res) => {
  const { specId } = req.params;
  const { groups } = req.body;
  /*
    groups: [
      { groupName: "Planning", taskIds: ["task-1", "task-2"] },
      { groupName: "Development", taskIds: ["task-3"] }
    ]
  */

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  groups.forEach((group) => {
    group.taskIds.forEach((taskId) => {
      const task = spec.output.tasks.find((t) => t.id === taskId);
      if (task) {
        task.group = group.groupName;
      }
    });
  });

  await spec.save();

  res.json({ success: true, data: spec });
});
