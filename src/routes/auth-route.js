const express = require("express");
//controller
const authController = require("../controller/auth-controller");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validators/user-validation");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
// Define your authentication routes here
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me",authenticate, authController.me);


module.exports = router;
