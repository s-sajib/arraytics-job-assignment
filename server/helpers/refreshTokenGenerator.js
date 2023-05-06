const jwt = require("jsonwebtoken");
require("dotenv");

function generateRefreshToken(id) {
  const refreshToken = jwt.sign(
    { _id: id, exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60 * 1000 }, // token will be expired after 8 hours
    process.env.JWT_REFRESH_KEY
  );
  return refreshToken;
}

module.exports = generateRefreshToken;
