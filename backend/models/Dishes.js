const sequelize = require("./_database");
const { DataTypes } = require("sequelize");
const Restaurant = require("./Restaurants");
const User = require("./User");

const Dishes = sequelize.define("Dishes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RestaurantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Restaurant,
      key: "id",
    },
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  }
});


module.exports = Dishes;