const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
  operatorsAliases: false
});

const { Note, NoteHistory } = sequelize.import("./Note");
const models = {
  Note,
  NoteHistory
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
