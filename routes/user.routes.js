const express = require("express");
const router = express.Router();

router.get("/api/users", searchBook);

module.exports = router;
