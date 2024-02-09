require("dotenv").config();
const app = require("./app.js");

const server = app.listen(process.env.PORT);
module.exports = server;
