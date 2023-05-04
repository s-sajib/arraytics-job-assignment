// Import required packages
const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Load environment Variables
const dotenv = require("dotenv");

// Set up JWT secret key
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Define middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(401).send("Access denied!");
  }
  try {
    const verifiedToken = jwt.verify(accessToken, jwtSecretKey);
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(400).send("Invalid token!");
  }
};

// Define routes for authentication
router.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send("User registered successfully!");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Email or password is incorrect!");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Email or password is incorrect!");
  }
  const accessToken = jwt.sign({ _id: user._id }, jwtSecretKey);
  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "none", // Set to 'lax' or 'strict' if needed
      secure: false, // Set to true if using HTTPS
    })
    .send("Logged in successfully!");
});

router.get("/api/user", verifyToken, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).send("User not found!");
  }
  res.send(user);
});

module.exports = router;
