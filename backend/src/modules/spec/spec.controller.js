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

  console.log(`
    specId : ${specId}
    epicIndex : ${epicIndex}
    storyIndex : ${storyIndex}
    orderedTaskIds : ${orderedTaskIds}
      `);

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  const story = spec.output?.epics?.[epicIndex]?.userStories?.[storyIndex];

  if (!story || !Array.isArray(story.tasks)) {
    return res.status(400).json({ message: "Invalid story path" });
  }

  const reorderedTasks = orderedTaskIds
    .map((id) => story.tasks.find((t) => String(t.id) === String(id)))
    .filter(Boolean);

  story.tasks = reorderedTasks;

  await spec.save();

  res.json({ success: true, data: spec });
});

// 📦 Group Tasks
export const groupTasks = asyncHandler(async (req, res) => {
  const { specId } = req.params;
  const { epicIndex, storyIndex, groups } = req.body;

  const spec = await Spec.findById(specId);
  if (!spec) {
    return res.status(404).json({ message: "Spec not found" });
  }

  const story = spec.output?.epics?.[epicIndex]?.userStories?.[storyIndex];

  if (!story || !Array.isArray(story.tasks)) {
    return res.status(400).json({ message: "Invalid story path" });
  }

  groups.forEach((group) => {
    group.taskIds.forEach((taskId) => {
      const task = story.tasks.find((t) => String(t.id) === String(taskId));

      if (task) {
        task.group = group.groupName;
      }
    });
  });

  await spec.save();

  res.json({ success: true, data: spec });
});
