const express = require("express");
const notes = require("./notes");

const router = express.Router();
router.use("/notes", notes);

module.exports = router;
