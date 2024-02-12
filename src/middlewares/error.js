const { ValidationError } = require("joi");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ValidationError) {
    err.statusCode = 400;
  } else if (err instanceof TokenExpiredError) {
    err.statusCode = 401;
  } else if (err instanceof JsonWebTokenError) {
    err.statusCode = 401;
  } else {
    err.statusCode = err.statusCode || 500;
    err.message;
  }
  res.status(err.statusCode).send({ error: err.message });
};
