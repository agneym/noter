const Sequelize = require("sequelize");

/**
 * Connect to Postgres Database.
 */
async function connectDb() {
  const sequelize = new Sequelize("postgres://agney:@127.0.0.1:5432/noter");
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
  return sequelize;
}

module.exports = connectDb;
