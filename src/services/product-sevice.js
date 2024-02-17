const prisma = require("../models/prisma");

//in case of schema change
const product = {
  1: {
    id: 1,
    name: "FLATBOX XXL",
    categoryId: 1,
    price: 4200,
    mainImage: "https://i.imgur.com/GD3S3cH.png",
    description:
      "Flatbox Controller is a pay to win controller , you buy this and you ascended in to GOD HOOD become Daigo, become king! BECOME GOD! and Probably win EVO idk it’s pretty hard since there are greater gods there, but not impossible if you believed. Flatbox XXL is bigger than Flatbox XL, so it’s better. Nope just kidding it's just bigger",
    status: "AVAILABLE",
    stock: 100,
  },
  2: {
    id: 2,
    name: "FLATBOX XL",
    categoryId: 1,
    price: 4000,
    mainImage: "https://i.imgur.com/YeNyTrr.png",
    description:
      "Flatbox Controller is a pay to win controller , you buy this and you ascended in to GOD HOOD become Daigo, become king! BECOME GOD! and Probably win EVO idk it’s pretty hard since there are greater gods there, but not impossible if you believed. Flatbox XL is smaller than Flatbox XXL, so it’s more popular for some reason. Nope just kidding it's just smaller",
    status: "AVAILABLE",
    stock: 100,
  },
};

exports.createProduct = async (product) => {
  return await prisma.product.create({
    data: product,
  });
};

exports.getAllProducts = async () => {
  return await prisma.product.findMany();
};

exports.getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

//shopping cart
const userHasCart = async (userId) => {
  const cart = await prisma.shoppingCart.findUnique({
    where: {
      userId: userId,
    },
  });

  return cart !== null;
};

async function createCartForUser(userId) {
  const newCart = await prisma.shoppingCart.create({
    data: {
      userId: userId,
    },
  });

  return newCart;
}

async function addItemToCart(cartId, productItemId, quantity, attribute) {
  const newItem = await prisma.shoppingCartItem.create({
    data: {
      cartId: cartId,
      productItemId: productItemId,
      quantity: quantity,
      attribute: attribute,
    },
  });

  return newItem;
}

const getCartItems = async (userId) => {
  const cartItems = await prisma.shoppingCart.findUnique({
    where: { userId: userId },
    include: { shoppingCartItem: true },
  });

  return cartItems;
};

const findCartItem = async (cartId, cartItemId) => {
  const item = await prisma.shoppingCartItem.findFirst({
    where: {
      cartId: cartId,
      id: cartItemId,
    },
  });

  return item;
};

const updateCartItem = async (cartId, cartItemId, newQuantity) => {
  const item = await findCartItem(cartId, cartItemId);
  if (!item) {
    throw new Error("Item not found in cart");
  }

  const updatedItem = await prisma.shoppingCartItem.update({
    where: {
      id: item.id,
    },
    data: {
      quantity: newQuantity,
    },
  });

  return updatedItem;
};

const deleteCartItem = async (cartId, productItemId) => {
  try {
    const item = await findCartItem(cartId, productItemId);
    console.log(item);

    if (!item) {
      throw new Error("Item not found in cart");
    }
    console.log("deleting");

    deletedItem = await prisma.shoppingCartItem.delete({
      where: {
        id: item.id,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    return item;
  }
};

//test

// updateCartItem(1, 8, 11).then((item) => {
//   console.log(item);
// });

// findCartItem(1, 8).then((item) => {
//   console.log(item);
// });
// deleteCartItem(1, 4).then((item) => {
//   console.log(item);
// });

addItemToCart(1, 1, 2, "red").then((item) => {
  console.log(item);
});
// getCartItems(1).then((cartItems) => {
//   console.log(cartItems);
// });

//test
// const getAllProducts = async () => {
//   return await prisma.product.findMany();
// };

// const createProduct = async (product) => {
//     return await prisma.product.create({
//       data: product,
//     });
//   };

// getAllProducts().then((products) => {
//   console.log(products);
// });
