const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan"); // logs incomig requests in terminal
const cors = require("cors");
const app = express();
app.use(cors());

const routes = require("./routes/routes.js");
app.use(bodyparser.json());

app.use(bodyparser.urlencoded()); //parsing form data
app.use((req, res, next) => {
  console.log(req.body);
  next();
});
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).send("Not Found ?!");
});
app.use(morgan("tiny"));

app.listen(80, () => {
  console.log("Server Is Running!!");
});
module.exports = app;
