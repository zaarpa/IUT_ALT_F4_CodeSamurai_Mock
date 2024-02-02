const Book = require("../models/book.model");
const fetchController = require("../controllers/bookFetch.controller");

const searchBook = async (req, res) => {
  try {
    const { title, author, genre, price, id, sort, order } = req.query;

    if (title || author || genre || price || id) {
      let query = {};
      if (title) {
        query.title = title;
      }

      if (genre) {
        query.genre = genre;
      }

      if (id) {
        query.id = id;
      }
      if (price) {
        query;
      }

      if (author) {
        query.author = author;
      }

      let sortOption = {};
      if (sort) {
        sortOption[sort] = order && order.toLowerCase() === "desc" ? -1 : 1;
        sortOption.id = 1;
      } else {
        sortOption.id = order && order.toLowerCase() === "desc" ? -1 : 1;
      }

      const books = await Book.find(query)
        .sort(sortOption)
        .select({ _id: 0, __v: 0 });

      res.status(200).json({ books });
    } else {
      fetchController.getAllBooks;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  searchBook,
};
