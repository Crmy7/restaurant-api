const Restaurant = require("../../models/Restaurants");

// delete restaurant

module.exports = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant non trouvé" });
        }
        await restaurant.destroy();
        return res.json({ message: "Restaurant supprimé" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la suppression du restaurant" });
    }
}