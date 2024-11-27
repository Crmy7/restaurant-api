const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// Route pour l'inscription des administrateurs
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "L'utilisateur existe déjà." });
    }

    // Crée un administrateur
    const user = await User.create({ username, password, role: "admin" });

    // Génère un token
    const token = user.generateToken();

    res.status(201).json({ message: "Administrateur créé avec succès.", token });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Route pour la connexion des administrateurs
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, role: "admin" } });

    if (!user || !(await user.validatePassword(password))) {
      return res
        .status(401)
        .json({ error: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    const token = user.generateToken();

    res.json({ message: "Connexion administrateur réussie.", token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
