var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');


// Lecture du fichier models/index.js afin de lancer la synchronisation de Sequelize
require("./models/index.js");

// Importation du middleware d'authentification
var authentificationMiddleware = require("./middlewares/authentification");

// Importation des routes
var indexRouter = require("./routes/index");
var restaurantsManagementAdmin = require("./routes/admin/restaurant.js");
var restaurantManagement = require("./routes/restaurant/restaurant.js");
var dishManagement = require("./routes/restaurant/dish/dish.js");
const adminAuth = require("./routes/auth/admin.js");
const userAuth = require("./routes/auth/client.js");
var usersRouter = require("./routes/users/user.js");
const ordersRouter = require("./routes/order/order.js");
const orderRestaurant = require("./routes/restaurant/order/order.js");

var app = express();
// Middleware pour gérer CORS
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Applique le middleware d'authentification
app.use(authentificationMiddleware);

// Préfixe /api pour les routes API
app.use("/api", indexRouter);
app.use("/api/admin/restaurants", restaurantsManagementAdmin);
app.use("/api/orders", ordersRouter);


// Préfixe /api/auth pour les routes d'authentification
app.use("/api/auth/admin", adminAuth);
app.use("/api/auth", userAuth);

// Préfixe /api/users pour les routes utilisateurs
app.use("/api/users", usersRouter);

// Préfixe /api/restaurant pour les routes restaurant
app.use("/api/manage/restaurant", restaurantManagement);

// Préfixe /api/restaurant/dish pour les routes plat
app.use("/api/manage/restaurant/dishes", dishManagement);

// Préfixe /api/restaurant/order pour les routes commande
app.use("/api/manage/restaurant", orderRestaurant);

// Gestion des erreurs 404
app.use(function (req, res, next) {
  res.status(404).json({ error: "Route introuvable." });
});

// Gestion globale des erreurs
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    error: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

module.exports = app;
