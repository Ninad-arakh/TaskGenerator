import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env.js";
import { safeJsonParse } from "../utils/jsonParser.js";
import { withRetry } from "../utils/retry.js";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const model = "gemini-2.5-flash";

function buildPrompt({ goal, users, constraints, templateType }) {
  return `
You are a senior product manager and engineering lead.

Return strictly valid JSON only.

Schema:
{
  "epics": [
    {
      "title": "string",
      "description": "string",
      "userStories": [
        {
          "title": "string",
          "description": "string",
          "tasks": [
            {
              "title": "string",
              "type": "frontend | backend | database",
              "priority": "low | medium | high"
            }
          ]
        }
      ]
    }
  ]
}

Feature:
Goal: ${goal}
Users: ${users}
Constraints: ${constraints || "None"}
Template: ${templateType || "Standard"}

Return valid JSON only. No markdown. No explanation.
`;
}

async function attemptJsonRepair(brokenText) {
  const repairPrompt = `
The following text should be valid JSON but is malformed.

Fix it and return valid JSON only:

${brokenText}
`;

  const repairResponse = await ai.models.generateContent({
    model,
    contents: repairPrompt,
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  return safeJsonParse(repairResponse.text);
}

export async function generateSpec(input) {
  return withRetry(async () => {
    const prompt = buildPrompt(input);

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    try {
      return safeJsonParse(response.text);
    } catch {
      return await attemptJsonRepair(response.text);
    }
  }, 2);
}
