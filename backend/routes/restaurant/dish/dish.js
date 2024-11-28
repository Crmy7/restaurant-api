var express = require("express");
var router = express.Router();

const AddDish = require("../../../services/dish/addDish");
const getDishesByRestaurant = require("../../../services/dish/getDishesByRestaurant");

// Route pour récupérer les plats d'un restaurant spécifique
router.get("/:id_restaurant", getDishesByRestaurant);

// Route pour ajouter un plat à un restaurant spécifique
router.post("/:id_restaurant/new-dish", AddDish);

module.exports = router;