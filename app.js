require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const apiRouter = require("./routes/api");
const app = express();

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

module.exports = app;
