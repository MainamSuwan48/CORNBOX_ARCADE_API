const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};
exports.comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
