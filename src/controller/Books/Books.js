const mongoose = require("mongoose");

const booksModel = require("../../model/Books");

const { ApiResponse } = require("../../utils/response/ApiResponse");
const { ApiError } = require("../../utils/error/ApiError");

const {
  InvalidIdError,
  BookNotFoundError,
} = require("../../utils/error/errorClass/errorClass");

const { handleError } = require("../../utils/helper/helperFunction");

async function getBooksData(req, res) {
  try {
    let responseMessage;
    let bookId = req.params.bookId;

    let coreMethod = bookId ? getBookDetails : getAllBooks;

    let books;
    if (bookId) {
      try {
        books = await coreMethod(bookId);
        responseMessage = "Get Single Book Data Fetched Successfully";
      } catch (error) {
        if (error instanceof InvalidIdError) {
          return res.status(400).json(new ApiError(400, error.message));
        } else if (error instanceof BookNotFoundError) {
          return res.status(404).json(new ApiError(404, error.message));
        }
      }
    } else {
      books = await coreMethod();
      responseMessage = "Get All Books Data Fetched Successfully";
    }

    return res.status(200).json(new ApiResponse(200, books, responseMessage));
  } catch (error) {
    // console.log({ error });
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
}

// Get All Books
async function getAllBooks(req, res) {
  try {
    return await booksModel.find({});
  } catch (error) {
    throw error;
  }
}

// Get Single Book Details
async function getBookDetails(bookId) {
  try {
    if (!mongoose.isValidObjectId(bookId)) {
      throw new InvalidIdError();
    }

    // Find the existing book
    const existingBook = await booksModel.findById(bookId);

    if (!existingBook) {
      throw new BookNotFoundError();
    }

    return existingBook;
  } catch (error) {
    throw error;
  }
}

// Add Book
async function addBook(req, res) {
  try {
    let { title, author, summary } = req.body;

    if (!title || !author || !summary) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    let bookObj = new booksModel({
      title,
      author,
      summary,
    });

    let data = await bookObj.save();

    return res
      .status(201)
      .json(new ApiResponse(201, data, "Book Added Successfully"));
  } catch (error) {
    // console.log(error);
    handleError(res, error);
  }
}

// Update Book
async function updateBook(req, res) {
  try {
    let bookId = req.params.bookId;
    let { title, author, summary } = req.body;

    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json(new ApiError(400, "Invalid _id provided"));
    }

    // Check if none of the fields are provided
    if (!title && !author && !summary) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "At least one of title, author, or summary is required"
          )
        );
    }

    // Find the existing book
    const existingBook = await booksModel.findById(bookId);

    if (!existingBook) {
      return res.status(404).json(new ApiError(404, "Book not found"));
    }

    const data = await booksModel.findByIdAndUpdate(
      bookId,
      { title, author, summary },
      {
        new: true,
        runValidators: true,
      }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Book Data Updated Successfully"));
  } catch (error) {
    // console.log(error);
    handleError(res, error);
  }
}

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json(new ApiError(400, "Invalid _id provided"));
    }

    // Find the existing book
    const existingBook = await booksModel.findById(bookId);

    if (!existingBook) {
      return res.status(404).json(new ApiError(404, "Book not found"));
    }

    // PATH : A
    // let data = await booksModel.findByIdAndDelete(bookId);
    // console.log(`🚀 ~ file: Books.js:162 ~ deleteBook ~ data:`, data);

    // return res
    //   .status(200)
    //   .json(new ApiResponse(200, data, "Book Data Deleted Successfully"));

    // PATH : B
    await booksModel.findByIdAndDelete(bookId);

    return res.status(204).send();
  } catch (error) {
    // console.log(error);
    handleError(res, error);
  }
};

module.exports = {
  getBooksData,
  addBook,
  updateBook,
  deleteBook,
};
