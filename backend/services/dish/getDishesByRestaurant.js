const Dishes = require("../../models/Dishes");
const Restaurant = require("../../models/Restaurants");

module.exports = async (req, res) => {
  try {
    const { id_restaurant } = req.params; // Récupérer l'ID du restaurant depuis les paramètres de l'URL

    // Vérifier si le restaurant existe
    const restaurant = await Restaurant.findByPk(id_restaurant);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant introuvable." });
    }

    // Récupérer les plats associés au restaurant
    const dishes = await Dishes.findAll({
      where: { RestaurantId: id_restaurant },
      attributes: ["id", "name", "price", "image", "description", "slug"], // Limiter les champs renvoyés
    });

    // Retourner les plats
    return res.status(200).json(dishes);
  } catch (error) {
    console.error("Erreur lors de la récupération des plats :", error);
    return res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des plats.",
    });
  }
};
