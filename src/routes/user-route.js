const express = require("express");

const userController = require("../controller/user-controller");
const {
  validateUpdateUser,
} = require("../middlewares/validators/user-validation");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.patch(
  "/:userId",
  authenticate,
  validateUpdateUser,
  userController.updateUserById
);
router.get("/:userId/address", authenticate, userController.getAddressByUserId);

router.post(
  "/:userId/address",
  authenticate,
  userController.createAddressByUserId
);
router.patch(
  "/:userId/address",
  authenticate,
  userController.updateAddressByUserId
);

router.delete(
  "/:userId/address",
  authenticate,
  userController.deleteAddressById
);

router.get("/addressAll", userController.getAllAddresses);

module.exports = router;
