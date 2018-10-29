const NoteHistory = require("../models").NoteHistory;

exports.findAll = (req, res) => {
  const { id } = req.params;
  NoteHistory.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    order: [["archivedAt", "DESC"]],
    where: {
      modelId: id
    }
  }).then(result => {
    res.json(result);
  });
};
