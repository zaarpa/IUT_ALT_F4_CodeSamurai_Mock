const express = require("express");
const router = express.Router();

const walletController = require("../controllers/walletBalance.controller");

router.get("/api/wallets/:wallet_id", walletController.getWalletBalance);
router.put("/api/wallets/:wallet_id", walletController.addWalletBalance);

module.exports = router;
