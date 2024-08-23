/** @format */

const express = require("express");
const userRouter = require("./user");
// const depositRouter = require("./deposit");

const router = express.Router();

router.use("/auth", userRouter); // This will prepend /users to all routes defined in user.js
// router.use("/deposit", depositRouter); // This will prepend /deposit to all routes defined in deposit.js
module.exports = router;
