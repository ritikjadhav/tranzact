const express = require("express");
const router = express.Router();
const userRoute = require("../routes/user");
const cors = require("cors");

router.use("/user", cors(), userRoute);

module.exports = router;
