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

// import Spec from "./spec.model.js";
// import generateSpec from "./spec.service.js";
// import asyncHandler from "../../utils/asyncHandler.js";
// import ApiError from "../../utils/apiError.js";
// import { buildMarkdown } from "../../utils/markdownBuilder.js";

// export const createSpec = asyncHandler(async (req, res) => {
//   const { goal, users, constraints, templateType } = req.body;

//   if (!goal || !users) {
//     throw new ApiError(400, "Goal and users are required.");
//   }

//   const structuredOutput = await generateSpec({
//     goal,
//     users,
//     constraints,
//     templateType,
//   });

//   const spec = await Spec.create({
//     goal,
//     users,
//     constraints,
//     templateType,
//     output: structuredOutput,
//   });

//   res.status(201).json(spec);
// });

// export const getRecentSpecs = asyncHandler(async (req, res) => {
//   const specs = await Spec.find().sort({ createdAt: -1 }).limit(5);

//   res.json(specs);
// });

// export const exportMarkdown = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const spec = await Spec.findById(id);

//   if (!spec) {
//     throw new ApiError(404, "Spec not found");
//   }

//   const markdown = buildMarkdown(spec.output);

//   res.setHeader("Content-Type", "text/markdown");
//   res.setHeader("Content-Disposition", `attachment; filename=spec-${id}.md`);

//   res.send(markdown);
// });
