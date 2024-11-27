var express = require('express');
var router = express.Router();
const AddRestaurant = require('../../services/restaurant/addRestaurant');
const EditRestaurant = require('../../services/restaurant/editRestaurant');
const DeleteRestaurant = require('../../services/restaurant/deleteRestaurant');

// Add a restaurant
router.post('/new-restaurant', AddRestaurant);

// Edit a restaurant
router.patch('/edit-restaurant/:id', EditRestaurant);

// Delete a restaurant
router.delete('/delete-restaurant/:id', DeleteRestaurant);

module.exports = router;
