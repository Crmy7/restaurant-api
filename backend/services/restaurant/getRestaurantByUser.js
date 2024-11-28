const Restaurant = require("../../models/Restaurants");
const Dishes = require("../../models/Dishes");

module.exports = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { UserId: req.user.id },
      include: [Dishes],
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Vous ne posséder pas de restaurant" });
    }

    return res.json(restaurant);
  } catch (error) {
    console.error("Erreur lors de la récupération du restaurant :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération du restaurant." });
  }
};
