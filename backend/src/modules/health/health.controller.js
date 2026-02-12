import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai";
import { ENV } from "../../config/env.js";

export const getHealth = async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1;

  let llmStatus = true;

  try {
    const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "ping",
    });

  } catch {
    llmStatus = false;
  }

  res.json({
    backend: true,
    database: dbStatus,
    llm: llmStatus,
  });
};

export const healthCheck = (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
};
