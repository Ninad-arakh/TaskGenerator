import rateLimit from "express-rate-limit";

const windowMs = 15 * 60 * 1000;

/**
 * Global API limiter
 * Prevents general abuse
 */
export const globalLimiter = rateLimit({
  windowMs,
  max: process.env.NODE_ENV === "production" ? 100 : 1000,
});
// export const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // 100 requests per IP
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     message: "Too many requests. Please try again later.",
//   },
// });

/**
 * Strict limiter for LLM generation
 * Protects Gemini usage
 */
export const generateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 spec generations per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Generation limit exceeded. Please wait before trying again.",
  },
});
