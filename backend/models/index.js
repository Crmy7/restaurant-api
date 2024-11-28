const sequelize = require("./_database");

const User = require("./User");
const Restaurant = require("./Restaurants");
const Dishes = require("./Dishes");
const Orders = require("./Orders");
const OrderItem = require("./OrderItem");

// Associations entre les modèles

// Un restaurant peut avoir plusieurs plats, chaque plat appartient à un seul restaurant
Restaurant.hasMany(Dishes, { foreignKey: "RestaurantId", onDelete: "CASCADE" });
Dishes.belongsTo(Restaurant, { foreignKey: "RestaurantId" });

// Un plat peut être créé par un utilisateur, chaque utilisateur peut créer plusieurs plats
User.hasMany(Dishes, { foreignKey: "UserId", onDelete: "CASCADE" });
Dishes.belongsTo(User, { foreignKey: "UserId" });

// Un utilisateur peut posséder plusieurs restaurants, chaque restaurant appartient à un utilisateur
User.hasMany(Restaurant, { foreignKey: "UserId", onDelete: "CASCADE" });
Restaurant.belongsTo(User, { foreignKey: "UserId", onDelete: "CASCADE" });

// Un utilisateur peut passer plusieurs commandes, chaque commande appartient à un utilisateur
User.hasMany(Orders, { foreignKey: "UserId", onDelete: "CASCADE" });
Orders.belongsTo(User, { foreignKey: "UserId" });

// Une commande est liée à un restaurant (les plats commandés doivent provenir d'un restaurant)
Restaurant.hasMany(Orders, { foreignKey: "RestaurantId", onDelete: "CASCADE" });
Orders.belongsTo(Restaurant, { foreignKey: "RestaurantId" });

// Une commande peut contenir plusieurs articles, chaque article appartient à une commande
Orders.hasMany(OrderItem, { foreignKey: "OrderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Orders, { foreignKey: "OrderId" });

// Un article de commande est lié à un plat
OrderItem.belongsTo(Dishes, { foreignKey: "DishId", onDelete: "CASCADE" });
Dishes.hasMany(OrderItem, { foreignKey: "DishId", onDelete: "CASCADE" });


// Synchronisation de la base
sequelize.sync();

module.exports = {
  User,
  Restaurant,
  Dishes,
  Orders,
  OrderItem,
};
