const Sequelize = require("sequelize");

module.exports = initDb = () =>
  new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
  });
