const express = require("express");
const router = express.Router();
const stationController = require("../controllers/createStation.controller");

router.post("/api/stations", stationController.createStation);

module.exports = router;
