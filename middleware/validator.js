/** @format */

const { body, validationResult } = require("express-validator");

// Middleware for validating registration
const validateRegistration = [
  body("email")
    .notEmpty()
    .withMessage("Email is required") // Check if not empty first
    .bail() // Stop running validations if the previous one failed
    .isEmail()
    .withMessage("Invalid email format"), // Then check for valid email format
  body("password").notEmpty().withMessage("Password is required"),
  body("phone").notEmpty().withMessage("Number field is required"),
  body("currency").notEmpty().withMessage("Currency is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// login validator
const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required") // Check if not empty first
    .bail() // Stop running validations if the previous one failed
    .isEmail()
    .withMessage("Invalid email format"), // Then check for valid email format
  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegistration,
  validateLogin,
};
