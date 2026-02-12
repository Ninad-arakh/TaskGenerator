

const generateSpec = require("../../services/gemini.service.js")
import ApiError from "../../utils/apiError.js";


export const generateSpecController = async (req, res, next) => {
  try {
    const result = await generateSpec(req.body);

    if (!result) {
      throw new ApiError("Failed to generate spec", 500);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
