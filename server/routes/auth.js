// Import required packages
const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//Load environment Variables
const dotenv = require("dotenv");
const verifyToken = require("../middlewares/verifier");

function generateAccessToken(id) {
  return jwt.sign(
    {
      _id: id,
      exp: Math.floor(Date.now() / 1000) + 15 * 60 * 1000,
    },
    process.env.JWT_SECRET_KEY
  );
}

// Define routes for authentication

//self registration
router.post("/self-register", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    const validation = await user.validate();
    const savedUser = await user.save();
    res.send("User registered successfully!");
  } catch (err) {
    res.status(400).send(err);
  }
});

//User registers another user

router.post("/register", verifyToken, async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    created_by: req.user._id,
  });
  try {
    const validation = await user.validate();
    const savedUser = await user.save();
    res.send("User registered successfully!");
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
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

  const accessToken = generateAccessToken(user._id);
  const refreshToken = jwt.sign(
    { _id: user._id, exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60 * 1000 }, // token will be expired after 8 hours
    process.env.JWT_REFRESH_KEY
  );
  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "none", // Set to 'lax' or 'strict' if needed
      secure: true, // Set to true if using HTTPS
      expires: new Date(Date.now() + 15 * 60 * 1000), // cookie will be removed after 15 minutes
    })
    .send({ message: "Logged in successfully!", refreshToken });
});

//logout
router.get("/logout", async (req, res) => {
  res
    .cookie("access_token", "", {
      httpOnly: true,
      sameSite: "none", // Set to 'lax' or 'strict' if needed
      secure: true, // Set to true if using HTTPS
    })
    .send("Logged Out successfully!");
});

//get user
router.get("/user", verifyToken, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).send("User not found!");
  }
  res.send(user);
});

//refresh accessToken if expired
router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).send("Refresh token not found!");
  }

  try {
    const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    const accessToken = generateAccessToken(token._id);
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "none", // Set to 'lax' or 'strict' if needed
        secure: true, // Set to true if using HTTPS
        expires: new Date(Date.now() + 15 * 60 * 1000), // cookie will be removed after 15 minutes
      })
      .send({ message: "Access Token Regenerated successfully!" });
  } catch {
    res.status(401).send("Refresh token is invalid!");
  }
});

module.exports = router;
