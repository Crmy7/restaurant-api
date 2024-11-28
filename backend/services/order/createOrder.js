const Orders = require("../../models/Orders");
const OrderItem = require("../../models/OrderItem");
const Dishes = require("../../models/Dishes");

module.exports = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Le panier est vide." });
  }

  try {
    // Récupérer les plats avec leurs `RestaurantId`
    const dishes = await Promise.all(
      items.map(async (item) => {
        const dish = await Dishes.findByPk(item.id);
        if (!dish) {
          throw new Error(`Le plat avec l'id ${item.id} n'existe pas.`);
        }
        return { ...item, RestaurantId: dish.RestaurantId };
      })
    );

    // Regrouper les plats par `RestaurantId`
    const dishesByRestaurant = dishes.reduce((acc, item) => {
      if (!acc[item.RestaurantId]) {
        acc[item.RestaurantId] = [];
      }
      acc[item.RestaurantId].push(item);
      return acc;
    }, {});

    const orders = [];

    // Créer une commande par restaurant
    for (const [restaurantId, restaurantItems] of Object.entries(
      dishesByRestaurant
    )) {
      const total = restaurantItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Créer une commande pour le restaurant
      const order = await Orders.create({
        UserId: userId,
        total,
        RestaurantId: restaurantId,
      });

      // Ajouter les plats à la commande
      for (const item of restaurantItems) {
        await OrderItem.create({
          OrderId: order.id,
          DishId: item.id,
          quantity: item.quantity,
          price: item.price,
        });
      }

      orders.push(order);
    }

    res.status(201).json({ message: "Commandes créées avec succès", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la création des commandes.",
    });
  }
};
