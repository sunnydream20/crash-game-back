/** @format */
const express = require("express");
const router = express.Router();
const { userController } = require("../controller"); // Adjust the path accordingly

router.post("/signup", userController.signup);

module.exports = router;
