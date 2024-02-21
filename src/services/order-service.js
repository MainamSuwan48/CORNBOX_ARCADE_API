const prisma = require("../models/prisma");

exports.createOrder = async (userId, shippingAddressId) => {
  console.log(shippingAddressId, "*********** shippingAddressId");

  const newOrder = await prisma.order.create({
    data: {
      userId: parseInt(userId),
      shippingAddressId: shippingAddressId,
      status: "DEPOSITED",
      paymentStatus: "NOT_PAID",
    },
  });
  return newOrder;
};

exports.createOrderItems = async (orderId, cartId) => {
  const cartItems = await prisma.shoppingCartItem.findMany({
    where: { cartId: parseInt(cartId) },
  });

  const orderItems = cartItems.map((cartItem) => {
    return {
      orderId: parseInt(orderId),
      productId: cartItem.productItemId,
      quantity: cartItem.quantity,
      attribute: cartItem.attribute,
    };
  });
  // return orderItems;

  const newOrderItems = await prisma.orderItem.createMany({
    data: orderItems,
  });
  return newOrderItems;
};

exports.getOrders = async (userId) => {
  const orders = await prisma.order.findMany({
    where: { userId: parseInt(userId) },
    include: {
      orderItem: true,
    },
  });
  return orders;
};

exports.updateOrderStatus = async (orderId, data) => {
  return await prisma.order.update({
    where: {
      id: parseInt(orderId),
    },
    data: {
      status: data.status,
      paymentStatus: data.paymentStatus,
    },
  });
};
