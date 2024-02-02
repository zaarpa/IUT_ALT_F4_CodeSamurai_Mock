const express = require("express");
const router = express.Router();

const { searchBook } = require("../controllers/searchController");

router.post("/books", function (req, res) {
  res.send("Create a book");
});

router.put("/books/:id", function (req, res) {
  res.send("Update a book");
});

router.get("/books/:id", function (req, res) {
  res.send("get a book");
});

router.get("/books", function (req, res) {
  res.send("get all books");
});

router.get("/api/books", searchBook);

module.exports = router;
