const { DataTypes } = require("sequelize");

const MyMovieTripDB = require("@DB");

const Scenes = MyMovieTripDB.define(
  "scenes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    film: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Scenes;
