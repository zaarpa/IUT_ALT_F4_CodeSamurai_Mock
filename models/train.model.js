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
      },
      departure_time: {
        type: String,
      },
      fare: {
        type: Number,
        required: true,
      },
    },
  ],
});

trainSchema.methods.toJSONRepresentation = function () {
  return {
    train_id: this.train_id,
    train_name: this.train_name,
    capacity: this.capacity,
    service_start: this.stops[0].departure_time, // Assuming service starts at the first stop's arrival time
    service_ends: this.stops[this.stops.length - 1].arrival_time, // Assuming service ends at the last stop's departure time
    num_stations: this.stops.length,
  };
};

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
