const Book = require("../models/book.model");

const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, genre, price } = req.body;

    const existingBook = await Book.findOne({ id });

    if (!existingBook) {
      return res
        .status(404)
        .json({ message: `Book with id: ${id} was not found` });
    }

    existingBook.title = title;
    existingBook.author = author;
    existingBook.genre = genre;
    existingBook.price = price;

    await existingBook.save();

    res.status(200).json(existingBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  updateBook,
};
