const bcrypt = require("bcrypt");
//load model
const User = require("../../models/User/User");

//load helpers
const generateAccessToken = require("../../helpers/accessTokenGenerator");
const generateRefreshToken = require("../../helpers/refreshTokenGenerator");

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Email or password is incorrect!");
  }

  const userDataToSend = { name: user.name, email: user.email, _id: user._id };

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Email or password is incorrect!");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.setHeader("Access-Control-Allow-Credentials", "true");
  //send response
  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "none", // Set to 'lax' or 'strict' if needed
      secure: true, // Set to true if using HTTPS
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // cookie will be removed after 1 hour
    })
    .send({
      message: "Logged in successfully!",
      refreshToken,
      user: userDataToSend,
    });
}

module.exports = login;
