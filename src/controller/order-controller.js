const createError = require("../utilities/create-error");
const orderService = require("../services/order-service");
const catchError = require("../utilities/catch-error");

exports.createOrder = catchError(async (req, res) => {
  const { userId } = req.params;
  const { shippingAddressId } = req.body;
    console.log(shippingAddressId, "*********** shippingAddressId from order-controller")
  console.log(req.params, "***********")
  const order = await orderService.createOrder(userId, shippingAddressId);
  res.status(201).json(order);
});

exports.createOrderItems = catchError(async (req, res) => {
  console.log(req.params, "*********** req.params from order-controller")
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

exports.updateOrderStatus = catchError(async (req, res) => {
  const { orderId } = req.params;
  const data = req.body;
  const order = await orderService.updateOrderStatus(orderId, data);
  res.status(200).json(order);
});