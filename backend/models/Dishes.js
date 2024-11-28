const sequelize = require("./_database");
const { DataTypes } = require("sequelize");
const slugify = require("slugify");
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
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Le slug ne peut pas être vide." },
    },
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
  },
});

// Générer automatiquement le slug avant la création
Dishes.beforeCreate((dish) => {
  if (!dish.slug) {
    dish.slug = slugify(dish.name, { lower: true, strict: true });
  }
});

// Générer un nouveau slug si le nom change avant la mise à jour
Dishes.beforeUpdate((dish) => {
  if (dish.changed("name")) {
    dish.slug = slugify(dish.name, { lower: true, strict: true });
  }
});

module.exports = Dishes;