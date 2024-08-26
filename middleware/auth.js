/** @format */

const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next(
      new ErrorHandler(
        "Please login to access this resource. Token not found",
        401
      )
    );
  }

  const decodedData = jwt.verify(token, "secret");
  const userFound = await User.findById(decodedData.id);

  if (!userFound) {
    return next(new ErrorHandler("Please login to access this resource.", 401));
  }
  req.user = userFound;
  next();
};

exports.verifyUser = async (token) => {
  const decodedData = jwt.verify(token, "secret");
  const userFound = await User.findById(decodedData.id);
  if (!userFound) {
    return "Invalid User";
  } else {
    return userFound;
  }
};
