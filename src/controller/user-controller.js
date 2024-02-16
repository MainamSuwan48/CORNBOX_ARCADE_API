const userService = require("../services/user-service");
const catchError = require("../utilities/catch-error");
const createError = require("../utilities/create-error");

exports.updateUserById = catchError(async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.findUserById(userId);
  if (!user) {
    createError("User not found", 404);
  }
  const updatedUser = await userService.updateUserById(userId, req.body);
  res.status(200).json(updatedUser);
});

exports.getAddressesByUserId = catchError(async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.findUserById(userId);
  if (!user) {
    createError("User not found", 404);
  }
  const addresses = await userService.findAddressesByUserId(userId);
  res.status(200).json(addresses);
});

exports.createAddressByUserId = catchError(async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.findUserById(userId);
  if (!user) {
    createError("User not found", 404);
  }
  const address = await userService.createAddressByUserId(userId, req.body);
  res.status(201).json(address);
});

exports.updateAddressByUserId = catchError(async (req, res) => {
  const userId = req.params.userId;
  const addressId = req.body.addressId;
  const user = await userService.findUserById(userId);
  if (!user) {
    createError("User not found", 404);
  }
  const address = await userService.findAddressById(addressId);
  if (!address) {
    createError("Address not found", 404);
  }
  const updatedAddress = await userService.updateAddressByUserId(
    userId,
    addressId,
    req.body
  );
  res.status(200).json(updatedAddress);
});
