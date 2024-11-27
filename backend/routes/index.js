var express = require('express');
var router = express.Router();
const GetRestaurants = require('../services/restaurant/getRestaurants');
const GetRestaurantsID = require('../services/restaurant/getRestaurantsID');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: "Hello World" });
});

// Get all restaurants
router.get('/restaurants', GetRestaurants);

// Get restaurant by ID
router.get("/restaurants/:slug", GetRestaurantsID);

module.exports = router;
