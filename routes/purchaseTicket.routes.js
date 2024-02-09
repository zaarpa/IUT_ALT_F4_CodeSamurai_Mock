const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/purchaseTicket.controller");

router.post("/api/tickets", ticketController.purchaseTicket);
module.exports = router;
