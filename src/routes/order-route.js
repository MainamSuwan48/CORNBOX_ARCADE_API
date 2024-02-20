const express = require("express");

const orderController = require("../controller/order-controller");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/create/:userId", orderController.createOrder);

module.exports = router;