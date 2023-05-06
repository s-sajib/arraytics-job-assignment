const jwt = require("jsonwebtoken");
require("dotenv");

function generateAccessToken(id) {
  return jwt.sign(
    {
      _id: id,
      exp: Math.floor(Date.now() / 1000) + 15 * 60 * 1000,
    },
    process.env.JWT_SECRET_KEY
  );
}

module.exports = generateAccessToken;
