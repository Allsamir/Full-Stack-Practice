require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const router = require("./api/users");

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Full stack app listening on port ${port}`);
});
