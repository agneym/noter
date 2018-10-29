const Sequelize = require("sequelize");

const sequelize = new Sequelize(`postgres://agney:@127.0.0.1:5432/noter`, {
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
