const express = require("express");
const app = express();
const mongoose = require("mongoose");
const stationRoutes = require("./routes/station.routes");
const userRoutes = require("./routes/user.routes");
const walletRoutes = require("./routes/walletBalance.routes");

const trainRoutes = require("./routes/train.routes");

app.use(express.json());
app.use(stationRoutes);
app.use(userRoutes);
app.use(walletRoutes);

app.use(trainRoutes);
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
