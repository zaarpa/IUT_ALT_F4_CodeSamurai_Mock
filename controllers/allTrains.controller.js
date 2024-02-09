const Train = require("../models/train.model");
const Station = require("../models/station.model");

// Controller function to list all trains at a given station
const listTrainsAtStation = async (req, res) => {
  const { station_id } = req.params;
  try {
    // Check if the station exists
    const stationExists = await Station.exists({
      station_id: parseInt(station_id),
    });
    if (!stationExists) {
      return res
        .status(404)
        .json({ message: `Station with id: ${station_id} was not found` });
    }

    // Retrieve trains passing through the station
    const stationTrains = await Train.find({
      "stops.station_id": parseInt(station_id),
    }).exec();
    if (!stationTrains.length) {
      return res
        .status(200)
        .json({ station_id: parseInt(station_id), trains: [] });
    }

    stationTrains.sort((a, b) => {
      const aDeparture = a.stops.find(
        (stop) => stop.station_id === parseInt(station_id)
      )?.departure_time;
      const bDeparture = b.stops.find(
        (stop) => stop.station_id === parseInt(station_id)
      )?.departure_time;
      const aArrival = a.stops.find(
        (stop) => stop.station_id === parseInt(station_id)
      )?.arrival_time;
      const bArrival = b.stops.find(
        (stop) => stop.station_id === parseInt(station_id)
      )?.arrival_time;

      const compareTime = (timeA, timeB) => {
        if (timeA === null && timeB === null) return 0;
        if (timeA === null) return -1;
        if (timeB === null) return 1;
        return timeA.localeCompare(timeB);
      };

      if (compareTime(aDeparture, bDeparture) !== 0) {
        return compareTime(aDeparture, bDeparture);
      } else if (compareTime(aArrival, bArrival) !== 0) {
        return compareTime(aArrival, bArrival);
      } else {
        return a.train_id - b.train_id;
      }
    });
    const response = {
      station_id: parseInt(station_id),
      trains: stationTrains.map((train) => {
        const stop = train.stops.find(
          (stop) => stop.station_id === parseInt(station_id)
        );
        return {
          train_id: train.train_id,
          arrival_time: stop.arrival_time,
          departure_time: stop.departure_time,
        };
      }),
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error listing trains:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { listTrainsAtStation };
