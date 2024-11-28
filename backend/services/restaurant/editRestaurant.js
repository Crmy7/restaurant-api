const Restaurant = require("../../models/Restaurants");

// Modifier les informations du restaurant
module.exports = async (req, res) => {
  try {
    const [updated] = await Restaurant.update(req.body, {
      where: {
        UserId: req.user.id,
      },
    });

    if (updated) {
      return res
        .status(200)
        .json({ message: "Les informations du restaurant ont été mises à jour avec succès." });
    } else {
      return res.status(404).json({ error: "Restaurant non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la modification du restaurant :", error);
    return res.status(500).json({
      error: "Erreur lors de la modification du restaurant.",
    });
  }
};
