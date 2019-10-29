var express = require('express');
var router = express.Router();
// const axios = require('axios');

// load .env
require("dotenv").config();

("use strict");

const yelp = require('yelp-fusion');
const client = yelp.client(process.env.apikey);

const dbController = require('../controllers/dbControllers');

// use mongoose
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.user}:${process.env.password}@${process.env.host}/${process.env.db}`;
mongoose.connect((process.env.DATABASE_URL || mongoDB), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Matches with "/api/mid/.../.../.../...."
// ________________________________________
//
// Find a mid-point from 2 sets of latitude and longitude
// then request a list of buisness names in that lat long

router.get("/mid/:lat1/:long1/:lat2/:long2", function (req, res, next) {
  function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  function radians_to_degrees(radians) {
    return radians * 180 / Math.PI;
  }
 
  // https://stackoverflow.com/questions/4656802/midpoint-between-two-latitude-and-longitude#4656937

  let nlat1 = req.params.lat1;
  let nlon1 = req.params.long1;

  let nlat2 = req.params.lat2;
  let nlon2 = req.params.long2;

  console.log(nlat1,nlon1,nlat2,nlon2)
  let dLon = degrees_to_radians(nlon2 - nlon1);

  let lat1 = degrees_to_radians(nlat1);
  let lat2 = degrees_to_radians(nlat2);
  let lon1 = degrees_to_radians(nlon1);

  let Bx = Math.cos(lat2) * Math.cos(dLon)
  let By = Math.cos(lat2) * Math.sin(dLon)

  let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
  let lon3  = lon1 + Math.atan2(By, Math.cos(lat1) + Bx); 

  let lat = radians_to_degrees(lat3)
  let lon = radians_to_degrees(lon3)

  req.url = `/mp/${lat}/${lon}`;
  router.handle(req, res);
  
});

router.get("/mp/:lat1/:long1", function (req, res, next) {
  let nlat1 = req.params.lat1;
  let nlon1 = req.params.long1;

  client.search({
    latitude: nlat1,
    longitude: nlon1,
    radius: 33
  }).then(response => {
    res.json(response.jsonBody);
    console.log(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });
}
)

module.exports = router;

