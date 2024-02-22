const createError = require("../utilities/create-error");
const orderService = require("../services/order-service");
const catchError = require("../utilities/catch-error");
const uploadService = require("../services/upload-service");

exports.createOrder = catchError(async (req, res) => {
  const { userId } = req.params;
  const { shippingAddressId, shoppingCartId } = req.body;
  console.log(
    shippingAddressId,
    "*********** shippingAddressId from order-controller"
  );
  console.log(req.params, "***********");
  const order = await orderService.createOrder(
    userId,
    shippingAddressId,
    shoppingCartId
  );
  res.status(201).json(order);
});

exports.createOrderItems = catchError(async (req, res) => {
  console.log(req.params, "*********** req.params from order-controller");
  const { orderId } = req.params;
  const { cartId } = req.body;
  const orderItems = await orderService.createOrderItems(orderId, cartId);
  res.status(201).json(orderItems);
});

exports.getOrders = catchError(async (req, res) => {
  const { userId } = req.params;
  const orders = await orderService.getOrders(userId);
  res.status(200).json(orders);
});

exports.getAllOrders = catchError(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json(orders);
});

exports.updateOrderStatus = catchError(async (req, res) => {
  const { orderId } = req.params;
  const order = await orderService.updateOrderStatus(orderId, data);
  res.status(200).json(order);
});

exports.uploadReceipt = catchError(async (req, res) => {
  const { orderId } = req.params;
  const receiptPath = req.file.path;
  const secure_url = await uploadService.upload(receiptPath);
  if (!secure_url) {
    throw createError(500, "Receipt upload failed");
  }
  const receipt = await orderService.uploadReceipt(orderId, secure_url);
  res.status(200).json({ receipt, secure_url });
});

exports.getAllReceipts = catchError(async (req, res) => {
  const receipts = await orderService.getAllReceipts();
  res.status(200).json(receipts);
});
