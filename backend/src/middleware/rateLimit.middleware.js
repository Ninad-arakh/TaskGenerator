import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

export const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many generation requests. Try again later.",
});
