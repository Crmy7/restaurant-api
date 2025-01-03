const Restaurant = require("../../models/Restaurants");
const User = require("../../models/User");

// delete restaurant
module.exports = async (req, res) => {
    try {
        // Récupérer le restaurant par son ID

        // Vérifier si le restaurant existe et si l'utilisateur actif est administrateur
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant non trouvé" });
        }

        // si l'utilisateur n'est pas administrateur
        if (req.user.role !== "admin") {
            return res.status(403).json({
                error: "Vous n'êtes pas autorisé à supprimer ce restaurant",
            });
        }

        // Récupérer l'utilisateur associé au restaurant
        const user = await User.findByPk(restaurant.UserId);
        if (user) {
            await user.destroy(); // Supprime l'utilisateur
        }

        // Supprimer le restaurant
        await restaurant.destroy();

        return res.json({ message: "Restaurant et utilisateur associés supprimés avec succès" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la suppression du restaurant et de l'utilisateur associé" });
    }
};
