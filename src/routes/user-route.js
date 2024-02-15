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

module.exports = router;
