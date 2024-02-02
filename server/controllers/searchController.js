const Book = require("../models/book.model");

const searchBook = async (req, res) => {
  try {
    const topic = req.query.topic;
    console.log(topic);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  searchBook,
};
