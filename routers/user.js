/** @format */
const express = require("express");
const router = express.Router();
const { userController } = require("../controller"); // Adjust the path accordingly

// import validators
const {
  validateLogin,
  validateRegistration,
} = require("../middleware/validator");

router.post("/signup", validateRegistration, userController.signup);
router.post("/signin", validateLogin, userController.signin);

module.exports = router;
