const express = require("express");
const router = express.Router();
const trainController = require("../controllers/train.controller.js");

router.post("/api/trains", trainController.createTrain);

module.exports = router;
