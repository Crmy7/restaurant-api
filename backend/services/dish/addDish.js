const Dishes = require("../../models/Dishes");
const Restaurant = require("../../models/Restaurants");

// Add a dish to the database with the user's id and the restaurant id from the URL
module.exports = async (req, res) => {
  const { name, price, image, description } = req.body;
  const { id_restaurant } = req.params; // Récupérer l'ID du restaurant depuis l'URL
  const userId = req.user.id; // Récupérer l'ID de l'utilisateur actif depuis le token

  // Validation des données reçues
  if (!name || !price || !image || !description || !id_restaurant) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    // Vérifier si le restaurant existe
    const restaurant = await Restaurant.findByPk(id_restaurant);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant introuvable." });
    }

    // Création du plat dans la base de données
    const newDish = await Dishes.create({
      name,
      price,
      image,
      description,
      RestaurantId: id_restaurant, // Utiliser l'ID du restaurant récupéré dans l'URL
      UserId: userId, // Associer l'utilisateur actif
    });

    // Réponse réussie avec le plat nouvellement créé
    return res.status(201).json({
      message: "Plat ajouté avec succès.",
      dish: newDish,
    });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout du plat." });
  }
};
