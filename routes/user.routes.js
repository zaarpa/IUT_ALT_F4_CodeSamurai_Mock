const express = require("express");
const router = express.Router();

const userController = require("../controllers/createUser.controller");

router.post("/api/users", userController.createUser);

module.exports = router;
