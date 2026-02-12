import mongoose from "mongoose";

const specSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      required: true,
      trim: true,
    },
    users: {
      type: String,
      required: true,
      trim: true,
    },
    constraints: {
      type: String,
      default: "",
      trim: true,
    },
    templateType: {
      type: String,
      // enum: ["prd", "technical", "mvp", "custom"],
      default: "custom",
    },

    output: {
      type: mongoose.Schema.Types.Mixed, // strict structured JSON from LLM
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default mongoose.model("Spec", specSchema);
