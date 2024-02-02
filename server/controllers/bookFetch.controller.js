const Book = require("../models/book.model.js");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookid = parseInt(req.params.id);
    const book = await Book.findOne({ id: bookid });
    if (!book) {
      res
        .status(404)
        .json({ message: "Book with id " + req.params.id + " was not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBooks, getBookById };
