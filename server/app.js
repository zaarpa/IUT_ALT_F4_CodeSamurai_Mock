const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

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
