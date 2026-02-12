export async function withRetry(fn, retries = 2) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (i === retries) break;

      console.warn(`Retry attempt ${i + 1} failed. Retrying...`);
    }
  }

  throw lastError;
}
