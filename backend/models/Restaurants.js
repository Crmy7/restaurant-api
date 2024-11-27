const sequelize = require("./_database");
const { DataTypes } = require("sequelize");
const slugify = require("slugify");

const Restaurant = sequelize.define("Restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le nom ne peut pas être vide." },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "L'adresse ne peut pas être vide." },
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La ville ne peut pas être vide." },
    },
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{5}$/, // Valide les codes postaux au format français
      notEmpty: { msg: "Le code postal ne peut pas être vide." },
    },
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le pays ne peut pas être vide." },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9+\-\s()]+$/, // Valide les numéros de téléphone
      notEmpty: { msg: "Le numéro de téléphone ne peut pas être vide." },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "L'email doit être valide." },
      notEmpty: { msg: "L'email ne peut pas être vide." },
    },
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: "Le site web doit être une URL valide." },
      notEmpty: { msg: "Le site web ne peut pas être vide." },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La description ne peut pas être vide." },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: "L'image doit être une URL valide." },
      notEmpty: { msg: "L'image ne peut pas être vide." },
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Le slug ne peut pas être vide." },
    },
  },
});

// Génération automatique du slug avant la création
Restaurant.beforeCreate((restaurant) => {
  if (!restaurant.slug) {
    restaurant.slug = slugify(restaurant.name, { lower: true, strict: true });
  }
});

// Mise à jour du slug avant une mise à jour si le nom change
Restaurant.beforeUpdate((restaurant) => {
  if (restaurant.changed("name")) {
    restaurant.slug = slugify(restaurant.name, { lower: true, strict: true });
  }
});

module.exports = Restaurant;
