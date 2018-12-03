var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require("./server/routes/index");
// var usersRouter = require("./server/routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./server/routes")(app);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Request does not match any known route."
  })
);

module.exports = app;
