const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.routes");
const walletRoutes = require("./routes/walletBalance.routes");

app.use(express.json());
app.use(userRoutes);
app.use(walletRoutes);

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
