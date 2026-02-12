import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../../config/env.js";

export const getHealth = async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1;

  let llmStatus = true;
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch {
    llmStatus = false;
  }

  res.json({
    backend: true,
    database: dbStatus,
    llm: llmStatus,
  });
};
