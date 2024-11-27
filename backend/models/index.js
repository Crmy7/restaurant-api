const sequelize = require("./_database");

const User = require("./User");
const Restaurant = require("./Restaurants");
const Dishes = require("./Dishes");
const Cart = require("./Cart");
const CartDishes = require("./CartDishes");

Dishes.belongsTo(Restaurant, { through: "RestaurantId" });
Restaurant.hasMany(Dishes);

// Attribute dishes to user
Dishes.belongsTo(User, { through: "UserId" });

// Attribute restaurant to user
Restaurant.belongsTo(User, { through: "UserId" });

// Attribute cart to user with dishes
Cart.hasMany(CartDishes, { foreignKey: "CartId", onDelete: "CASCADE" });
CartDishes.belongsTo(Cart, { foreignKey: "CartId" });

// // Synchronisation de la base
sequelize.sync();

module.exports = {
  User: User,
  Restaurant: Restaurant,
  Dishes: Dishes,
};
