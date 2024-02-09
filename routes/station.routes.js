const express = require("express");
const router = express.Router();
const stationController = require("../controllers/createStation.controller");
const listStationsController = require("../controllers/allStations.controller");
const allTrainsController = require("../controllers/allTrains.controller");

router.post("/api/stations", stationController.createStation);
router.get("/api/stations", listStationsController.listStations);
router.get(
  "/api/stations/:station_id/trains",
  allTrainsController.listTrainsAtStation
);

module.exports = router;
