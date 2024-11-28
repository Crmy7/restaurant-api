const Dishes = require("../../models/Dishes");

module.exports = async (req, res) => {
  try {
    // Recherche du plat par slug
    const dish = await Dishes.findOne({
      where: { slug: req.params.slug }, // Récupère le slug depuis l'URL
    });

    // Si le plat n'existe pas, retourne une erreur 404
    if (!dish) {
      return res.status(404).json({ error: "Plat non trouvé" });
    }

    // Retourne le plat et les informations du restaurant associé
    return res.json(dish);
  } catch (error) {
    console.error("Erreur lors de la récupération du plat :", error);
    return res.status(500).json({
      error: "Erreur lors de la récupération du plat",
    });
  }
};
