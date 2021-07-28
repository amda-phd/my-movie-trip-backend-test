const Sequelize = require("sequelize");

const { NODE_ENV, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const MyMovieTripDB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: NODE_ENV === "local",
});

module.exports = MyMovieTripDB;
