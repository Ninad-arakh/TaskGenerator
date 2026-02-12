import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const start = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};

start();
