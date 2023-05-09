const jwt = require("jsonwebtoken");
require("dotenv");

function generateAccessToken(id) {
  const token = jwt.sign(
    {
      _id: id,
      exp: Math.floor(Date.now() / 1000) + 1 * 60 * 60, // 1 hour
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
}

module.exports = generateAccessToken;
