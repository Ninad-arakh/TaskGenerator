import dotenv from "dotenv";

dotenv.config();

const required = ["MONGO_URI", "GEMINI_API_KEY"];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required env variable: ${key}`);
    process.exit(1);
  }
});

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  NODE_ENV: process.env.NODE_ENV || "development",
};
