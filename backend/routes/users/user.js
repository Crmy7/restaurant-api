const express = require("express");
const router = express.Router();

// Route pour obtenir les informations de l'utilisateur connecté
router.get("/@me", async (req, res) => {
  try {
    console.log(
      "Route /@me appelée pour l'utilisateur :",
      req.user ? req.user.id : "Non authentifié"
    );

    // Vérifie que l'utilisateur a été injecté par le middleware
    if (!req.user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Désactive le cache pour éviter de servir des données obsolètes
    res.set("Cache-Control", "no-store");

    // Renvoie les informations de l'utilisateur
    res.status(200).json({
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
