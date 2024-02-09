const express = require("express");
const router = express.Router();
const stationController = require("../controllers/createStation.controller");
const listStationsController = require("../controllers/allStations.controller");

router.post("/api/stations", stationController.createStation);
router.get("/api/stations", listStationsController.listStations);

module.exports = router;
