const { Router } = require("express");
const router = Router();
const userRoute = require("../routes/user");
const accountRoute = require("../routes/account");
const cors = require("cors");

router.use("/user", cors(), userRoute);

router.use("/account", cors(), accountRoute);

module.exports = router;
