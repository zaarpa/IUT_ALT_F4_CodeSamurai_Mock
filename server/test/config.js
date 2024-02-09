const mongoose = require("mongoose");

const connectToDatabase = (mongodburi) => {
  const db = mongoose
    .connect(mongodburi)
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((error) => {
      console.log(error);
    });
  return db;
};

module.exports = connectToDatabase;
