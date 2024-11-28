const express = require("express");
const router = express.Router();
const getRestaurantByUser = require("../../services/restaurant/getRestaurantByUser");
const editRestaurant = require("../../services/restaurant/editRestaurant");

// Récupérer les informations du restaurant d'un utilisateur
router.get("/my-restaurant", getRestaurantByUser);

// Modifier les informations du restaurant
router.patch("/my-restaurant", editRestaurant);

module.exports = router;
