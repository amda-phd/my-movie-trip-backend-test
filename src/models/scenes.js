const { DataTypes } = require("sequelize");

const MyMovieTripDB = require("@DB");

const Scenes = MyMovieTripDB.define(
  "scenes",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    film: {
      type: DataTypes.STRING,
    },
    creation_date: {
      type: DataTypes.DATE,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Scenes;
