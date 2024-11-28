const Orders = require("../../../models/Orders");
const OrderItem = require("../../../models/OrderItem");
const Dishes = require("../../../models/Dishes");
const Restaurant = require("../../../models/Restaurants");
const User = require("../../../models/User");

module.exports = async (req, res) => {
  const { id_restaurant } = req.params;

  try {
    // Vérifier si le restaurant existe
    const restaurant = await Restaurant.findByPk(id_restaurant);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant introuvable." });
    }

    // Récupérer les commandes associées au restaurant
    const orders = await Orders.findAll({
      where: { RestaurantId: id_restaurant },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Dishes,
              attributes: ["id", "name", "price", "image", "description"],
              include: [
                {
                  model: Restaurant,
                  attributes: ["id", "name", "address", "city", "zipCode"],
                },
              ],
            },
          ],
        },
        // Display user information
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes." });
  }
};
