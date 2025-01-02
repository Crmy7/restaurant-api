const express = require("express");
const router = express.Router();

const getOrderByRestaurant = require("../../../services/restaurant/order/getOrderByRestaurant");
const deleteOrder = require("../../../services/restaurant/order/deleteOrder");

// Route pour récupérer les commandes d'un restaurant spécifique
router.get("/:id_restaurant/orders", getOrderByRestaurant);

// Route pour supprimer une commande
router.delete("/order/:id_order", deleteOrder);

module.exports = router;
