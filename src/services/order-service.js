const prisma = require("../models/prisma");

exports.createOrder = async (userId, shippingAddressId, shoppingCartId) => {
  console.log(shippingAddressId, "*********** shippingAddressId");

  const newOrder = await prisma.order.create({
    data: {
      userId: parseInt(userId),
      shippingAddressId: shippingAddressId,
      status: "DEPOSITED",
      paymentStatus: "NOT_PAID",
      shoppingCartId: shoppingCartId,
    },
  });
  return newOrder;
};

exports.createOrderItems = async (orderId, cartId) => {
  ///FIND STOCK
  const product = await prisma.product.findMany();
  const stocks = product.map((product) => {
    return {
      productId: product.id,
      stock: product.stock,
    };
  });

  ///FIND CART ITEMS
  const cartItems = await prisma.shoppingCartItem.findMany({
    where: { cartId: parseInt(cartId) },
  });

  ///CHECK IF STOCK IS ENOUGH
  const cartItemsQuantity = cartItems.map((cartItem) => {
    return {
      productId: cartItem.productItemId,
      quantity: cartItem.quantity,
    };
  });
  cartItemsQuantity.forEach((cartItem) => {
    const stock = stocks.find(
      (stock) => stock.productId === cartItem.productId
    );
    if (stock.stock < cartItem.quantity) {
      throw new Error("Not enough stock");
    }
  });

  ///CHECKED STOCK!!!
  ///UPDATE STOCK

  const orderItems = cartItems.map((cartItem) => {
    return {
      orderId: parseInt(orderId),
      productId: cartItem.productItemId,
      quantity: cartItem.quantity,
      attribute: cartItem.attribute,
    };
  });

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

exports.getAllOrders = async () => {
  const orders = await prisma.order.findMany({
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

exports.uploadReceipt = async (orderId, receiptSrc) => {
  return await prisma.receipt.create({
    data: {
      src: receiptSrc,
      orderId: parseInt(orderId),
    },
  });
};

exports.getAllReceipts = async () => {
  return await prisma.receipt.findMany();
};
