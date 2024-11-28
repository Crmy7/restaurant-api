const Restaurant = require("../../models/Restaurants");

// Modifier les informations du restaurant
module.exports = async (req, res) => {
  try {
    // Récupérer le restaurant lié à l'utilisateur connecté
    const restaurant = await Restaurant.findOne({
      where: {
        UserId: req.user.id, // Utiliser l'ID de l'utilisateur connecté
      },
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant non trouvé." });
    }

    // Mise à jour du restaurant
    const [updated] = await Restaurant.update(req.body, {
      where: {
        id: restaurant.id, // Utiliser l'ID trouvé
      },
    });

    if (updated) {
      return res
        .status(200)
        .json({ message: "Les informations du restaurant ont été mises à jour avec succès." });
    } else {
      return res.status(500).json({ error: "Impossible de mettre à jour le restaurant." });
    }
  } catch (error) {
    console.error("Erreur lors de la modification du restaurant :", error);
    return res.status(500).json({
      error: "Erreur lors de la modification du restaurant.",
    });
  }
};
