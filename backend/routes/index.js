var express = require('express');
var router = express.Router();
const GetRestaurants = require('../services/restaurant/getRestaurants');
const GetRestaurantsID = require('../services/restaurant/getRestaurantsID');
const getDishesSlug = require('../services/dish/getDishesSlug');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: "Hello World" });
});

// Get all restaurants
router.get('/restaurants', GetRestaurants);

// Get restaurant by slug
router.get("/restaurants/:slug", GetRestaurantsID);

// Get dishes by slug
router.get("/dishes/:slug", getDishesSlug);


module.exports = router;
