const bcrypt = require("bcrypt");
//load model
const User = require("../../models/User/User");

//load helpers
const generateAccessToken = require("../../helpers/accessTokenGenerator");
const generateRefreshToken = require("../../helpers/refreshTokenGenerator");

async function login(req,res) {
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
  const refreshToken = generateRefreshToken(user._id);

  //send response
  res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "none", // Set to 'lax' or 'strict' if needed
        secure: true, // Set to true if using HTTPS
        expires: new Date(Date.now() + 15 * 60 * 1000), // cookie will be removed after 15 minutes
      })
      .send({ message: "Logged in successfully!", refreshToken });
}

module.exports = login;
