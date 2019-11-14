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

app.use("/api", apiRouter);
app.use(express.static("client/build"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
