const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Got it"));

module.exports = router;
