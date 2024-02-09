const express = require("express");
const app = express();
const mongoose = require("mongoose");

// const bookRoutes = require("./routes/book.routes");

app.use(express.json());
// app.use(bookRoutes);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log(error);
  });

//routes

module.exports = app;
