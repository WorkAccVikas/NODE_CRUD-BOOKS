class InvalidIdError extends Error {
  constructor(msg = "Invalid _id provided") {
    super(msg);
    this.name = "InvalidIdError";
  }
}

class BookNotFoundError extends Error {
  constructor(msg = "Book not found") {
    super(msg);
    this.name = "BookNotFoundError";
  }
}

module.exports = {
  InvalidIdError,
  BookNotFoundError,
};
