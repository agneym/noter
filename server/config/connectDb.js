const Sequelize = require("sequelize");

/**
 * Connect to Postgres Database.
 */
async function connectDb() {
  const sequelize = new Sequelize("postgres://agney:@127.0.0.1:5432/noter", {
    operatorsAliases: false
  });
  return sequelize;
}

module.exports = connectDb;
