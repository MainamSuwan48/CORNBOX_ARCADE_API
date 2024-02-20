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
