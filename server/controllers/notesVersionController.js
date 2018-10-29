const HTTP_CODE = require("../config/httpStatus");
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
    const response = {
      status: HTTP_CODE.HTTP_SUCCESS,
      result
    };
    res.json(response);
  });
};
