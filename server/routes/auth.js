// Import required packages
const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//Load environment Variables
const dotenv = require("dotenv");
const verifyToken = require("../middlewares/verifier");

// Define routes for authentication
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  // res.send(user);
  try {
    const validation = await user.validate();
    console.log("User is valid!");
    const savedUser = await user.save();
    console.log("User registered successfully!");
    res.send("User registered successfully!");
  } catch (err) {
    console.log("Error:", err.message);
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Email or password is incorrect!");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Email or password is incorrect!");
  }
  const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "none", // Set to 'lax' or 'strict' if needed
      secure: true, // Set to true if using HTTPS
    })
    .send("Logged in successfully!");
});

router.get("/user", verifyToken, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).send("User not found!");
  }
  res.send(user);
});

module.exports = router;
