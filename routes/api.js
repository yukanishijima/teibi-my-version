var express = require("express");
var router = express.Router();
// var axios = require("axios");

var animalNames = require("./animals.json");

var passport = require("../config/passport");

("use strict");

const yelp = require("yelp-fusion");
const client = yelp.client(process.env.apikey);

const dbController = require("../controllers/dbControllers");

// use mongoose
var mongoose = require("mongoose");
//Set up default mongoose connection
// var mongoDB = `mongodb://localhost/teibidb`;
var mongoDB = `mongodb://${process.env.user}:${process.env.password}@${process.env.host}/${process.env.db}`;
// console.log(mongoDB);
mongoose.connect(process.env.DATABASE_URL || mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Matches with "/api/mid/.../.../.../...."
// ________________________________________
//
// Find a mid-point from 2 sets of latitude and longitude
// then request a list of buisness names in that lat long

router.get("/mid/:lat1/:long1/:lat2/:long2", function(req, res) {
  function degreesToRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  function radiansToDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  // https://stackoverflow.com/questions/4656802/midpoint-between-two-latitude-and-longitude#4656937

  let nlat1 = req.params.lat1;
  let nlon1 = req.params.long1;

  let nlat2 = req.params.lat2;
  let nlon2 = req.params.long2;

  // console.log(nlat1, nlon1, nlat2, nlon2);
  let dLon = degreesToRadians(nlon2 - nlon1);

  let lat1 = degreesToRadians(nlat1);
  let lat2 = degreesToRadians(nlat2);
  let lon1 = degreesToRadians(nlon1);

  let Bx = Math.cos(lat2) * Math.cos(dLon);
  let By = Math.cos(lat2) * Math.sin(dLon);

  let lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
  );
  let lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

  let lat = radiansToDegrees(lat3);
  let lon = radiansToDegrees(lon3);

  req.url = `/mp/${lat}/${lon}`;
  router.handle(req, res);
});

// Uses YELP api to get a list of buisnesses depending on lat/lon within a radius
// The radius will increase if nothing is found until something comes back with a timeout to prevent use from reaching the max YELP api
router.get("/mp/:lat1/:long1", function(req, res) {
  let nlat1 = req.params.lat1;
  let nlon1 = req.params.long1;

  let radius = 25;

  function getLocations() {
    client
      .search({
        latitude: nlat1,
        longitude: nlon1,
        radius: radius
      })
      .then(response => {
        let dataResult = response.jsonBody;
        // console.log("Radius: " + radius + " Total: " + dataResult.total);
        if (dataResult.total > 5) {
          res.json(dataResult);
        } else {
          radius += 30;
          setTimeout(function() {
            getLocations();
          }, 500);
        }
      })
      .catch(e => {
        // console.log(e);
        res.json(JSON.parse(e.response.body));
      });
  }
  getLocations();
});

router.get("/show", function(req, res) {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.send(ip);
});

router.post("/signup", function(req, res) {
  dbController.create(req, res);
});

router.post("/signin", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

router.get("/user_data", function(req, res) {
  if (!req.user) {
    let randomIndex = Math.floor(Math.random() * animalNames.length);

    res.json({
      username: `${animalNames[randomIndex].name}`,
      loggedIn: false
    });
  } else {
    res.json({
      username: req.user.username,
      loggedIn: true
    });
  }
});

router.get("/logout", function(req, res) {
  req.logout();
  res.send("log out successful");
});

/* GET users listing. */
router.get("/user", function(req, res) {
  res.send("respond with a resource");
});

module.exports = router;
