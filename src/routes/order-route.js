const express = require("express");

const orderController = require("../controller/order-controller");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/create/:userId", orderController.createOrder);
router.post("/createItems/:orderId", orderController.createOrderItems);
router.get("/get/:userId", orderController.getOrders);

module.exports = router;