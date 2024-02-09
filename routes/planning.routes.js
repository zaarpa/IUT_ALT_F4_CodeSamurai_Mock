const express = require("express");
const router = express.Router();
const planningController = require("../controllers/planning.controller.js");

router.get("/api/routes", planningController.findOptimalRoute);

module.exports = router;
