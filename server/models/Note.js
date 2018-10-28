const note = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "note",
    {
      title: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.STRING
      },
      deletedAt: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
  return Note;
};

module.exports = note;
