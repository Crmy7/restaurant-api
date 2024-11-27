const Restaurant = require("../../models/Restaurants");

// Edit restaurant
module.exports = async (req, res) => {
    try {
        const [updated] = await Restaurant.update({
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            website: req.body.website,
            description: req.body.description,
            image: req.body.image,
        }, {
            where: {
                id: req.params.id
            }
        });

        if (updated) {
            return res.status(200).json({ message: "Restaurant modifié avec succès." });
        } else {
            return res.status(404).json({ error: "Restaurant non trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la modification du restaurant" });
    }
}
