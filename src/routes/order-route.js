const express = require("express");

const orderController = require("../controller/order-controller");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/create/:userId", orderController.createOrder);
router.post("/createItems/:orderId", orderController.createOrderItems);
router.get("/get/:userId", orderController.getOrders);
router.get("/getAll", orderController.getAllOrders);
router.patch("/update/:orderId", orderController.updateOrderStatus);
router.post("/uploadReceipt/:orderId",upload.single("image"), orderController.uploadReceipt);
router.get("/getReceipts", orderController.getAllReceipts);

module.exports = router;
