const Restaurant = require("../../models/Restaurants");

module.exports = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        return res.json(restaurants);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la récupération des restaurants" });
    }
};
