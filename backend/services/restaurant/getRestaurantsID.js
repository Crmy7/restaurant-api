const Restaurant = require("../../models/Restaurants");
const Dishes = require("../../models/Dishes");

module.exports = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { slug: req.params.slug },
      include: [Dishes],
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant non trouvé" });
    }

    return res.json(restaurant);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération du restaurant" });
  }
};
