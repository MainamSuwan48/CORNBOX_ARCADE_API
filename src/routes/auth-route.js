const express = require("express");
//controller
const authController = require("../controller/auth-controller");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validators/user-validation");
const router = express.Router();
// Define your authentication routes here
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", authController.me);
router.use("/test", authController.test);

module.exports = router;
