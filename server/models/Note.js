const note = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "note",
    {
      title: {
        type: DataTypes.TEXT
      },
      text: {
        type: DataTypes.TEXT
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
