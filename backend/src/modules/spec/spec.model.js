import mongoose from "mongoose";

const specSchema = new mongoose.Schema(
  {
    goal: { type: String, required: true },
    users: { type: String, required: true },
    constraints: { type: String },
    templateType: { type: String },

    output: {
      type: Object, // structured JSON from LLM
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Spec", specSchema);
