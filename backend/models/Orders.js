const sequelize = require("./_database");
const { DataTypes } = require("sequelize");

const Orders = sequelize.define("Orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending", // Statut de la commande
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  RestaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Assure que chaque commande est liée à un restaurant
    references: {
      model: "Restaurants", // Nom du modèle lié
      key: "id",
    },
  },
});

module.exports = Orders;
