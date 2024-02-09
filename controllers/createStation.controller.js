const Station = require("../models/station.model");

const createStation = async (req, res) => {
  const { station_id, station_name, longitude, latitude } = req.body;
  const newStation = new Station({
    station_id,
    station_name,
    longitude,
    latitude,
  });
  try {
    await newStation.save();
    const responseData = {
      station_id: newStation.station_id,
      station_name: newStation.station_name,
      longitude: newStation.longitude,
      latitude: newStation.latitude,
    };
    res.status(201).json(responseData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { createStation };
