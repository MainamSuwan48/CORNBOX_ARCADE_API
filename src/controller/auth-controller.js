const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const catchError = require("../utilities/catch-error");
const createError = require("../utilities/create-error");

exports.register = catchError(async (req, res, next) => {
  console.log("************", req);
  const existsUser = await userService.findUserByEmailOrUsername(
    req.body.email || req.body.username
  );
  if (existsUser) {
    throw createError("Username or Email already in use", 400);
  }
  console.log(req.body);
  const hashedPassword = await hashService.hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const createdUser = await userService.createUser(req.body);
  const payload = {
    id: createdUser.id,
    username: createdUser.username,
    email: createdUser.email,
  };
  const token = jwtService.signToken(payload);
  delete createdUser.password;

  res.status(201).json({ user: createdUser, token });
});

exports.login = catchError(async (req, res, next) => {
  console.log("************", req.body);
  const existsUser = await userService.findUserByEmailOrUsername(
    req.body.usernameOrEmail
  );

  if (!existsUser) {
    throw createError("Invalid Username, Email or Password", 400);
  }

  const isValidPassword = await hashService.comparePassword(
    req.body.password,
    existsUser.password
  );

  if (!isValidPassword) {
    throw createError("Invalid Username, Email or Password", 400);
  }
  const payload = {
    userId: existsUser.id,
  };
  const token = jwtService.signToken(payload);
  delete existsUser.password;



  res.status(200).json({ user: existsUser, token });
});

exports.test = catchError(async (req, res, next) => {
  res.status(200).json({ message: "Test route" });
});

exports.me = catchError(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});
