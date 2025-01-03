const Orders = require("../../../models/Orders");

module.exports = async (req, res) => {
  const { id_order } = req.params;

  try {
    // Vérifier si la commande existe
    const order = await Orders.findByPk(id_order);
    if (!order) {
      return res.status(404).json({ error: "Commande introuvable." });
    }

    // Vérifier si l'utilisateur actif est le propriétaire de du restaurant order.userId
    if (order.UserId !== req.user.id) {
      return res.status(403).json({
        error: "Vous n'êtes pas autorisé à supprimer cette commande.",
      });
    }


    // Supprimer la commande
    await order.destroy();

    res.json({ message: "Commande supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la commande." });
  }
};
