const Restaurant = require("../../models/Restaurants");
const slugify = require("slugify");

// Ajouter un restaurant et lier au token utilisateur
module.exports = async (req, res) => {
  try {
    const restaurantData = {
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
      UserId: req.user.id, // Association avec l'utilisateur connecté
    };

    // Générer automatiquement le slug si non fourni
    if (!restaurantData.slug) {
      restaurantData.slug = slugify(req.body.name, { lower: true, strict: true });
    }

    const restaurant = await Restaurant.create(restaurantData);
    return res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la création du restaurant" });
  }
};
