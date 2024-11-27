var express = require('express');
var router = express.Router();

const AddDish = require('../../services/dish/addDish');

// Add a dish
router.post('/new-dish', AddDish);

// Route pour ajouter un nouveau plat avec l'ID du restaurant dans l'URL
router.post('/restaurant/:id_restaurant/new-dish', AddDish);

module.exports = router;