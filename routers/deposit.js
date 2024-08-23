/** @format */
const express = require("express");
const router = express.Router();
const { userController } = require("../controller"); // Adjust the path accordingly

// import validators
const { validateRegistration } = require("../middleware/validator");

// router.post("/deposit", validateRegistration, userController.signup);

module.exports = router;
