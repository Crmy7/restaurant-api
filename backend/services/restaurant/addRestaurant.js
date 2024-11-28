const Restaurant = require("../../models/Restaurants");
const User = require("../../models/User");
const slugify = require("slugify");

// Ajouter un restaurant et créer un utilisateur Restaurateur
module.exports = async (req, res) => {
  try {
    const { name, address, city, zipCode, country, phone, email, website, description, image, ownerEmail, ownerPassword } = req.body;

    // Validation des champs nécessaires
    if (!ownerEmail || !ownerPassword) {
      return res.status(400).json({ error: "L'email et le mot de passe du restaurateur sont obligatoires." });
    }

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await User.findOne({ where: { username: ownerEmail } });
    if (existingUser) {
      return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà." });
    }

    // Créer un utilisateur avec le rôle Restaurateur
    const restaurateur = await User.create({
      username: ownerEmail,
      password: ownerPassword,
      role: "restaurateur",
    });

    // Générer automatiquement le slug pour le restaurant
    const restaurantSlug = slugify(name, { lower: true, strict: true });

    // Création du restaurant et association avec le restaurateur
    const restaurant = await Restaurant.create({
      name,
      address,
      city,
      zipCode,
      country,
      phone,
      email,
      website,
      description,
      image,
      slug: restaurantSlug,
      UserId: restaurateur.id, // Associer le restaurant au restaurateur
    });

    return res.status(201).json({
      message: "Restaurant créé avec succès.",
      restaurant,
      restaurateur: {
        id: restaurateur.id,
        username: restaurateur.username,
        role: restaurateur.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création du restaurant :", error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la création du restaurant." });
  }
};
