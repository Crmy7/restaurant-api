const express = require("express");
const router = express.Router();

const getOrderByRestaurant = require("../../../services/restaurant/order/getOrderByRestaurant");

// Route pour récupérer les commandes d'un restaurant spécifique
router.get("/:id_restaurant/orders", getOrderByRestaurant);

module.exports = router;
