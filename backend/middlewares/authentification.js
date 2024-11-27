const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authentificationMiddleware(req, res, next) {
  // Liste des routes publiques
  const publicPaths = [
    /^\/api\/auth\/login$/,
    /^\/api\/auth\/admin\/login$/,
    /^\/api\/auth\/register$/,
    /^\/api\/auth\/admin\/register$/,
  ];
  
  const isPublic = publicPaths.some((path) => path.test(req.path));
  if (isPublic) {
    return next();
  }

  // Vérifie l'en-tête Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou non valide." });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  try {
    // Décodage et vérification du token
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;

    // Récupération de l'utilisateur dans la base de données
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé." });
    }

    // Injecte l'utilisateur dans req.user pour les routes suivantes
    req.user = user;
    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    if (error.name === "TokenExpiredError") {
      return res.status(498).json({ error: "Token expiré." });
    }
    return res.status(401).json({ error: "Token invalide." });
  }
}

module.exports = authentificationMiddleware;
