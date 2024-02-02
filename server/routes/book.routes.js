const express = require("express");
const router = express.Router();
const addBookController = require("../controllers/addBook.controller");
const updateBookController = require("../controllers/updateBook.controller");
const fetchController = require("../controllers/bookFetch.controller");

router.post("/api/books", addBookController.addBook);

router.put("/api/books/:id", updateBookController.updateBook);

router.get("/api/books/:id", fetchController.getBookById);

router.get("/api/books", fetchController.getAllBooks);

router.get("/books", function (req, res) {
  res.send("search  books");
});

module.exports = router;
