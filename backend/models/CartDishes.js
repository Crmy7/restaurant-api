const sequelize = require("./_database");
const { DataTypes } = require("sequelize");

// CartDishes model, representing each dish and its quantity in the cart
const CartDishes = sequelize.define("CartDishes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Carts",
      key: "id",
    },
  },
  DishId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Dishes", // Assuming you have a Dishes table
      key: "id",
    },
  },
});

module.exports = CartDishes;
