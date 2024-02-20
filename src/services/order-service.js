const prisma = require("../models/prisma");

exports.createOrder = async (userId, shippingAddressId) => {
    console.log(shippingAddressId, "*********** shippingAddressId")
  const cartItems = await prisma.shoppingCartItem.findMany({
    where: { cartId: parseInt(userId) },
  });

  // return cartItems;

  console.log(cartItems, "*********** cartItems");

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
