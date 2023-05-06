const bcrypt = require("bcrypt");
//load model
const User = require("../../models/User/User");

//load helpers
const generateAccessToken = require("../../helpers/accessTokenGenerator");
const generateRefreshToken = require("../../helpers/refreshTokenGenerator");

async function login(email, password) {
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Email or password is incorrect!");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Email or password is incorrect!");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return { accessToken, refreshToken };
}

module.exports = login;
