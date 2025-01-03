const Orders = require("../../../models/Orders");
const Restaurant = require("../../../models/Restaurants");

module.exports = async (req, res) => {
  const { id_order } = req.params;

  try {
    // Vérifier si la commande existe
    const order = await Orders.findByPk(id_order, {
      include: {
        model: Restaurant,
        attributes: ["UserId"], // Inclure l'identifiant du propriétaire du restaurant
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Commande introuvable." });
    }

    // Vérifier si l'utilisateur connecté est le propriétaire du restaurant
    if (order.Restaurant.UserId !== req.user.id) {
      return res
        .status(403)
        .json({
          error: "Vous n'êtes pas autorisé à supprimer cette commande.",
        });
    }

    // Supprimer la commande
    await order.destroy();

    res.json({ message: "Commande supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la commande :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la commande." });
  }
};
