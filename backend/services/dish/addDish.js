const Dishes = require("../../models/Dishes");
const Restaurant = require("../../models/Restaurants");
const slugify = require("slugify");

// Ajouter un plat avec l'ID utilisateur et l'ID restaurant
module.exports = async (req, res) => {
  const { name, price, image, description } = req.body;
  const { id_restaurant } = req.params; // Récupérer l'ID du restaurant depuis l'URL
  const userId = req.user.id; // Récupérer l'ID de l'utilisateur actif depuis le token

  console.log("Données reçues (JSON):", req.body);

  // Validation des données reçues
  if (!name || !price || !image || !description || !id_restaurant) {
    console.log("Champs manquants : ", { name, price, image, description, id_restaurant });
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }  

  try {
    // Vérifier si le restaurant existe
    const restaurant = await Restaurant.findByPk(id_restaurant);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant introuvable." });
    }

    // Générer automatiquement le slug
    const slug = slugify(name, { lower: true, strict: true });

    // Vérifier si un plat avec le même slug existe déjà pour le restaurant
    const existingDish = await Dishes.findOne({
      where: { slug, RestaurantId: id_restaurant },
    });
    if (existingDish) {
      return res.status(400).json({
        error: "Un plat avec le même nom existe déjà pour ce restaurant.",
      });
    }

    // Création du plat dans la base de données
    const newDish = await Dishes.create({
      name,
      price,
      image,
      description,
      slug, // Ajout du slug généré
      RestaurantId: id_restaurant, // Association avec le restaurant
      UserId: userId, // Association avec l'utilisateur actif
    });

    // Réponse réussie avec le plat nouvellement créé
    return res.status(201).json({
      message: "Plat ajouté avec succès.",
      dish: newDish,
    });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    return res.status(500).json({
      error: "Une erreur s'est produite lors de l'ajout du plat.",
    });
  }
};
