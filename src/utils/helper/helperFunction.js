const { ApiError } = require("../../utils/error/ApiError");

function handleError(res, error) {
  if (error.name === "ValidationError") {
    // Handle Mongoose validation error
    const errors = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json(new ApiError(400, errors));
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    // This is a duplicate key error (E11000)
    let errorMessage = "Duplicate key error. ";
    if (error.message.includes("title")) {
      errorMessage += "Title must be unique.";
    }
    return res.status(409).json(new ApiError(409, errorMessage));
  } else {
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
}

module.exports = {
  handleError,
};
