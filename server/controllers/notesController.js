const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const HTTP_CODE = require("../config/httpStatus");

const Note = require("../models").Note;

/**
 * Create a New Note
 */
exports.create = [
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must have at least 3 characters."),
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
    Note.create({
      title: req.body.title || "Untitled Note",
      text: req.body.text
    }).then(
      success => {
        const response = {
          status: HTTP_CODE.HTTP_SUCCESS,
          message: "Note added successfully",
          result: success
        };
        res.status(201).json(response);
      },
      failure => {
        const response = {
          status: HTTP_CODE.HTTP_FAILURE,
          message: "Note creation failed",
          errors: JSON.stringify(failure)
        };
        res.status(400).json(response);
      }
    );
  }
];

exports.findAll = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  Note.findAll({
    order: [["createdAt", "DESC"]],
    offset: (page - 1) * limit,
    limit
  }).then(result => {
    const response = {
      status: HTTP_CODE.HTTP_SUCCESS,
      result: result
    };
    res.status(200).json(response);
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Note.findOne({ where: { id: id } }).then(
    result => {
      if (result) {
        const response = {
          status: HTTP_CODE.HTTP_SUCCESS,
          result
        };
        res.json(response);
      } else {
        const response = {
          status: HTTP_CODE.HTTP_FAILURE,
          message: "No Result Found"
        };
        res.status(404).json(response);
      }
    },
    failure => {
      const response = {
        status: HTTP_CODE.HTTP_FAILURE,
        errors: failure
      };
      res.json(response);
    }
  );
};

exports.update = [
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must have at least 3 characters."),
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
    const { id } = req.params;
    const { text, title } = req.body;
    Note.update(
      {
        text,
        title
      },
      {
        where: { id },
        returning: true
      }
    ).then(
      ([rowsUpdate, [result]]) => {
        const response = {
          status: HTTP_CODE.HTTP_SUCCESS,
          result: result
        };
        res.json(response);
      },
      failure => {
        const response = {
          status: HTTP_CODE.HTTP_FAILURE,
          error: failure
        };
        res.status(404).json(response);
      }
    );
  }
];

exports.delete = (req, res) => {
  const id = req.params.id;
  Note.destroy({ where: { id } }).then(
    result => {
      if (!!result) {
        const response = {
          status: HTTP_CODE.HTTP_SUCCESS,
          result: `${result} row Deleted Successfully`
        };
        res.json(response);
      } else {
        const response = {
          status: HTTP_CODE.HTTP_FAILURE,
          result: `Note with ${id} does not exist`
        };
        res.status(404).json(response);
      }
    },
    failure => {
      const response = {
        status: HTTP_CODE.HTTP_FAILURE,
        error: failure
      };
      res.status(404).json(response);
    }
  );
};
