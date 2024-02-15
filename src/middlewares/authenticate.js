const catchError = require("../utilities/catch-error");
const createError = require("../utilities/create-error");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authenticate = catchError(async (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log("**************", authorization);
  if (
    !authorization
    ||     !authorization.startsWith("Bearer ")
  ) {
    createError("invalid authorization header", 401);
  }
 
  const token = authorization.split(' ')[1];
  const decodedPayload = jwtService.verifyToken(token);
  console.log(decodedPayload)

  const user = await userService.findUserById(decodedPayload.id);
  if (!user) {
    createError("user was not found", 401);
  }
  delete user.password;
  req.user = user;
  next();
});

module.exports = authenticate;
