const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  train_id: {
    type: Number,
    required: true,
  },
  train_name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  stops: [
    {
      station_id: {
        type: Number,
        required: true,
      },
      arrival_time: {
        type: String,
        required: true,
      },
      departure_time: {
        type: String,
        required: true,
      },
      fare: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
