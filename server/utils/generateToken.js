const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret";
module.exports = function generateToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};
