const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const accessToken = req.cookies?.access_token;
  if (!accessToken) {
    return res.status(401).send("Access denied! You need to log in first!");
  }
  try {
    const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    req.user = verifiedToken;

    next();
  } catch (err) {
    res
      .status(406)
      .json({ message: "Access token expired! Please log in again!" });
  }
};

module.exports = verifyToken;
