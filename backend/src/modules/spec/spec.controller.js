import Spec from "./spec.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateSpec } from "../../services/gemini.service.js";
import { randomUUID } from "crypto";

export const createSpec = asyncHandler(async (req, res) => {
  const { goal, users, constraints, templateType } = req.body;

  const output = await generateSpec({
    goal,
    users,
    constraints,
    templateType,
  });

  output.epics?.forEach((epic) => {
    epic.userStories?.forEach((story) => {
      story.tasks?.forEach((task) => {
        task.id = randomUUID();
      });
    });
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

  let taskFound = null;

  for (const epic of spec.output.epics || []) {
    for (const story of epic.userStories || []) {
      const task = story.tasks?.find((t) => String(t.id) === String(taskId));

      if (task) {
        Object.assign(task, updates);
        taskFound = task;
        break;
      }
    }
    if (taskFound) break;
  }

  if (!taskFound) {
    return res.status(404).json({ message: "Task not found" });
  }

  spec.markModified("output"); // 👈 FORCE mongoose to detect change
  await spec.save();

  res.json({ success: true, data: spec });
});

// 🔁 Reorder Tasks
export const reorderTasks = asyncHandler(async (req, res) => {
  const { specId } = req.params;
  const { epicIndex, storyIndex, orderedTaskIds } = req.body;

  if (!Array.isArray(orderedTaskIds)) {
    return res.status(400).json({ message: "orderedTaskIds must be array" });
  }

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  const story = spec.output?.epics?.[epicIndex]?.userStories?.[storyIndex];

  if (!story || !Array.isArray(story.tasks)) {
    return res.status(400).json({ message: "Invalid story path" });
  }

  const existingTasks = story.tasks;

  // Map tasks by id
  const taskMap = new Map(existingTasks.map((task) => [String(task.id), task]));

  const reorderedTasks = [];

  for (const id of orderedTaskIds) {
    const task = taskMap.get(String(id));
    if (!task) {
      return res.status(400).json({
        message: `Task ${id} not found`,
      });
    }
    reorderedTasks.push(task);
  }

  if (reorderedTasks.length !== existingTasks.length) {
    return res.status(400).json({
      message: "Task count mismatch",
    });
  }

  story.tasks = reorderedTasks;

  // 🔥 REQUIRED
  spec.markModified("output");

  await spec.save();

  res.json({ success: true, data: spec });
});

export const getSpecById = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  res.json({ success: true, data: spec });
});

// 🧩 Group Tasks
export const groupTasks = asyncHandler(async (req, res) => {
  const { specId } = req.params;
  const { epicIndex, storyIndex, groups } = req.body;

  if (!Array.isArray(groups)) {
    return res.status(400).json({ message: "Groups must be array" });
  }

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  const story = spec.output?.epics?.[epicIndex]?.userStories?.[storyIndex];

  if (!story || !Array.isArray(story.tasks)) {
    return res.status(400).json({ message: "Invalid story path" });
  }

  const taskMap = new Map(story.tasks.map((task) => [String(task.id), task]));

  for (const group of groups) {
    if (!group.groupName || !Array.isArray(group.taskIds)) {
      return res.status(400).json({
        message: "Invalid group structure",
      });
    }

    for (const taskId of group.taskIds) {
      const task = taskMap.get(String(taskId));

      if (!task) {
        return res.status(400).json({
          message: `Task ${taskId} not found`,
        });
      }

      task.group = group.groupName;
    }
  }

  spec.markModified("output");
  await spec.save();

  res.json({ success: true, data: spec });
});

// 🗑 Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const { specId, taskId } = req.params;

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  let taskDeleted = false;

  for (const epic of spec.output.epics || []) {
    for (const story of epic.userStories || []) {
      const initialLength = story.tasks?.length || 0;

      story.tasks = story.tasks?.filter(
        (task) => String(task.id) !== String(taskId),
      );

      if (story.tasks.length !== initialLength) {
        taskDeleted = true;
        break;
      }
    }
    if (taskDeleted) break;
  }

  if (!taskDeleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  spec.markModified("output");
  await spec.save();

  res.json({ success: true, data: spec });
});
