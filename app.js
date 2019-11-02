require("dotenv").config();

var express = require("express");
var session = require("express-session");

var passport = require("./config/passport");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var apiRouter = require("./routes/api");
// var ipRouter = require('./routes/ip');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("client/build"));

app.use("/api", apiRouter);
// app.use('/api', ipRouter);

module.exports = app;
