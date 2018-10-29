const NoteHistory = require("../models").NoteHistory;

exports.findAll = (req, res) => {
  NoteHistory.findAll().then(result => {
    res.json(result);
  });
};
