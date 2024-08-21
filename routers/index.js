/** @format */

const express = require("express");
const userRouter = require("./user");

const router = express.Router();

router.use("/users", userRouter); // This will prepend /users to all routes defined in user.js

module.exports = router;
