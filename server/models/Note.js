const Sequelize = require("sequelize");
const sequelize = require("../config/connectDb");

const Note = sequelize.define("note", {
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  }
});

module.exports = Note;
