const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Title"],
      unique: [true, "Please Enter unique Title"],
      validate: [
        {
          validator: function (title) {
            const wordCount = title.split(" ").length;
            return wordCount >= 2 && wordCount <= 5;
          },
          message: "Title must contain between 2 and 5 words.",
        },
      ],
    },
    author: {
      type: String,
      required: [true, "Please Enter Author"],
    },
    summary: {
      type: String,
      require: [true, "Please Provide Summary of Books"],
      maxlength: [20, "Summary must not exceed 20 Characters."],
      validate: [
        {
          validator: function (summary) {
            return summary.trim().length > 0; // Check for non-empty string
          },
          message: "Summary must not be empty.",
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtual: true },
    validateBeforeSave: true, // Add this option
  }
);

const Books = mongoose.model("Books", booksSchema, "Books");

module.exports = Books;
