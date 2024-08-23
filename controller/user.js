/** @format */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import model
const User = require("../model/userModel");

// function to create a token
const createToken = (userId) => {
  const token = jwt.sign({ id: userId }, "secret", {
    expiresIn: "1h",
  });
  return token;
};

// create new user
exports.signup = async (req, res) => {
  try {
    const { email, password, phone, currency } = req.body;

    //check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // make hash from password
    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);

    // make new user
    const newUser = new User({ email, password: hashed, phone, currency });
    const savedUser = await newUser.save();
    res.status(200).json({ savedUser });
    // Your signup logic here
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Example of a login function where we compare passwords
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      console.log(user._id);
      // Generate a JWT after successful login
      const token = createToken(user._id); // Create the token with user ID
      console.log(token);
      res.status(200).json({ message: "Login successful", token }); // Return
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
