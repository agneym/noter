const note = (sequelize, DataTypes) => {
  const Note = sequelize.define("note", {
    title: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  });
  return Note;
};

module.exports = note;
