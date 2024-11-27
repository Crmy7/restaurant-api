const express = require("express");
const router = express.Router();
const addDishToCart = require("../../services/cart/addDishToCart");
const getCart = require("../../services/cart/getCart");
const updateDishQuantity = require("../../services/cart/updateDishQuantity");
const removeDishFromCart = require("../../services/cart/removeDishFromCart");

// Ajouter un plat au panier
router.post("/", async (req, res) => {
  const { userId, dishId, quantity } = req.body;

  try {
    const cart = await addDishToCart(userId, dishId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer le panier pour un utilisateur
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await getCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour la quantité d'un plat dans le panier
router.put("/", async (req, res) => {
  const { userId, dishId, quantity } = req.body;

  try {
    const updatedCartDish = await updateDishQuantity(
      userId,
      dishId,
      quantity
    );
    res.status(200).json(updatedCartDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un plat du panier
router.delete("/", async (req, res) => {
  const { userId, dishId } = req.body;

  try {
    await removeDishFromCart(userId, dishId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
