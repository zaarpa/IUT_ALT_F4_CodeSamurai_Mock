const Station = require("../models/station.model");

const listStations = async (req, res) => {
  try {
    const stations = await Station.find({}, { _id: 0, __v: 0 })
      .sort({ station_id: 1 })
      .exec();
    const response = { stations };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error listing stations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { listStations };
