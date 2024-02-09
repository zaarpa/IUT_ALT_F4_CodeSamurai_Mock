const express = require("express");
const router = express.Router();
const addBookController = require("../controllers/addBook.controller");
const updateBookController = require("../controllers/updateBook.controller");
const fetchController = require("../controllers/bookFetch.controller");
const { searchBook } = require("../controllers/searchController");

router.post("/api/books", addBookController.addBook);

router.put("/api/books/:id", updateBookController.updateBook);

router.get("/api/books/:id", fetchController.getBookById);

// router.get("/api/books", fetchController.getAllBooks);

router.get("/api/books", searchBook);

module.exports = router;
