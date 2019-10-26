var express = require('express');
var router = express.Router();

// load .env
require("dotenv").config();

const dbController = require("../controllers/dbController");

// use mongoose
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.user}:${process.env.password}@${process.env.host}/${process.env.db}`;
mongoose.connect((process.env.DATABASE_URL || mongoDB), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Matches with "/api/mid/../../"
router.route("/mid/:lat1/:long1/:lat2/:long2")
  .get(dbController.findMid)

module.exports = router;
