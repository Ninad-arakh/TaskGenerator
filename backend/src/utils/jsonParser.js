export const safeJSONParse = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};
