const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const HTTP_CODE = require("../config/httpStatus");

const Models = require("../models");

/**
 * Create a New Note
 */
exports.create = [
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must have at least 3 characters.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  sanitizeBody("title")
    .trim()
    .escape(),
  sanitizeBody("text")
    .trim()
    .escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response = {
        status: HTTP_CODE.HTTP_FAILURE,
        errors: errors.array()
      };
      res.json(response);
      return;
    }

    // Create a Note
    Models.Note.create({
      title: req.body.title || "Untitled Note",
      text: req.body.text
    }).then(
      success => {
        const response = {
          status: HTTP_CODE.HTTP_SUCCESS,
          result: "Note added successfully"
        };
        res.status(201).json(response);
      },
      failure => {
        const response = {
          status: HTTP_CODE.HTTP_FAILURE,
          result: "Note creation failed",
          description: JSON.stringify(failure)
        };
        res.status(400).json(response);
      }
    );
  }
];
