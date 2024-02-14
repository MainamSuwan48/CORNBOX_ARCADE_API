const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRETKEY || "vb4u787s2xyh7v41";
const EXPIRE_IN = process.env.EXPIRESIN || "1h";

exports.signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRE_IN });
};

exports.verifyToken = (token) => {
  console.log("+++++++++++++++++++++++++++++",SECRET_KEY);
  return jwt.verify(token, SECRET_KEY);
};

