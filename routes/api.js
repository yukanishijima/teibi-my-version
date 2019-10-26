var express = require('express');
var router = express.Router();
const axios = require('axios');

// load .env
require("dotenv").config();

("use strict");

const yelp = require("yelp-fusion");
const client = yelp.client(process.env.apikey);

const dbController = require("../controllers/dbControllers");

// use mongoose
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.user}:${process.env.password}@${process.env.host}/${process.env.db}`;
mongoose.connect((process.env.DATABASE_URL || mongoDB), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Matches with "/api/mid/../../"
router.get("/mid/:lat1/:long1/:lat2/:long2", function (req, res, next) {
  function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  // https://stackoverflow.com/questions/4656802/midpoint-between-two-latitude-and-longitude#4656937

  let nlat1 = req.params.lat1;
  let nlon1 = req.params.long1;

  let nlat2 = req.params.lat2;
  let nlon2 = req.params.long2;

  let dLon = degrees_to_radians(nlon2 - nlon1);

  let lat1 = degrees_to_radians(nlat1);
  let lat2 = degrees_to_radians(nlat2);
  let lon1 = degrees_to_radians(nlon1);

  let Bx = Math.cos(lat2) * Math.cos(dLon)
  let By = Math.cos(lat2) * Math.sin(dLon)

  let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
  let lon3  = lon1 + Math.atan2(By, Math.cos(lat1) + Bx); 

  client.search({
    latitude: lat3,
    longitude: lon3,
  }).then(response => {
    res.json(response.jsonBody);
    console.log(response.jsonBody.businesses[0].name);
  }).catch(e => {
    console.log(e);
  });
});

router.get("/mp/:lat1/:long1", function (req, res, next) {
  let nlat1 = req.params.lat1;
  let nlon1 = req.params.long1;

  client.search({
    latitude: nlat1,
    longitude: nlon1,
  }).then(response => {
    res.json(response.jsonBody);
    console.log(response.jsonBody.businesses[0].name);
  }).catch(e => {
    console.log(e);
  });
}
)

module.exports = router;
