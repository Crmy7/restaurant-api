const sequelize = require("./_database");
const { DataTypes } = require("sequelize");

// Cart model, representing a cart belonging to a user containing dishes
const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;
