const express = require("express");
const {
  getBooksData,
  addBook,
  updateBook,
  deleteBook,
} = require("../../controller/Books/Books");
const router = express.Router();

router.get("/:bookId?", getBooksData);
router.post("/", addBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

module.exports = router;
