const Orders = require("../../models/Orders");
const OrderItem = require("../../models/OrderItem");
const Dishes = require("../../models/Dishes");
const Restaurant = require("../../models/Restaurants");

module.exports = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Orders.findAll({
      where: { UserId: userId },
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
