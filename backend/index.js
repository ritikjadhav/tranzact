const express = require("express");
const router = require("./routes/index");

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("app running on port 3000");
});
