const Book = require("../models/book.model");

const addBook = async (req, res) => {
  try {
    const { id, title, author, genre, price } = req.body;

    const newBook = new Book({
      id,
      title,
      author,
      genre,
      price,
    });

    await newBook.save();

    res.status(201).json({ message: "Book Created" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addBook };
