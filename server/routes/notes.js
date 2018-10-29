const express = require("express");
const router = express.Router();

const notes = require("../controllers/notesController");
const versions = require("../controllers/notesVersionController");

// Get versions of a note
router.get("/version/:id", versions.findAll);

// Create a new Note
router.post("/", notes.create);

// Retrieve all Notes
router.get("/", notes.findAll);

// Retrieve a single Note with id
router.get("/:id", notes.findOne);

// Update a Note with id
router.put("/:id", notes.update);

// Delete a Note with id
router.delete("/:id", notes.delete);

module.exports = router;
