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
    stock: 10,
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
    stock: 10,
  },
};

const createProduct = async (product) => {
    return await prisma.product.create({
      data: product,
    });
  };

const createProductCategory = async (category) => {
    return await prisma.productCategory.create({
        data: category
    })}; 

  const newCategory = {
    name: 'Flatbox Controllers',
    desc: 'Hitbox Controllers for the Flatbox series of controllers.'
};

// createProductCategory(newCategory)


// createProduct(product[1]).then((product) => {
//     console.log(product);
//     });
// createProduct(product[2]).then((product) => {
//       console.log(product);
//     });
// DON"T FORGET TO CREATE CATEGORY FIRST
//DON"T FORGET TO COMMENT OUT THE ABOVE CODE AFTER RUNNING IT ONCE AND CHECKING THE DATABASE

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

exports.updateStock = async (productId, newStock) => {
  return await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      stock: parseInt(newStock),
    },
  });
}

//shopping cart
exports.userHasCart = async (userId) => {
  const cart = await prisma.shoppingCart.findUnique({
    where: {
      userId: userId,
    },
  });

  return cart !== null;
};

exports.createCartForUser = async (userId) => {
  const newCart = await prisma.shoppingCart.create({
    data: {
      userId: userId,
    },
  });

  return newCart;
};

exports.addItemToCart = async (cartId, productItemId, quantity, attribute) => {
  const newItem = await prisma.shoppingCartItem.create({
    data: {
      cartId: cartId,
      productItemId: productItemId,
      quantity: quantity,
      attribute: attribute,
    },
  });

  return newItem;
};

exports.getCartItems = async (userId) => {
  const cartItems = await prisma.shoppingCart.findUnique({
    where: { userId: parseInt(userId) },
    include: { shoppingCartItem: true },
  });

  return cartItems;
};

exports.findCartItem = async (cartItemId) => {
  const item = await prisma.shoppingCartItem.findFirst({
    where: {
      id: cartItemId,
    },
  });

  return item;
};

const findCartItem = async (cartItemId) => {
  const item = await prisma.shoppingCartItem.findFirst({
    where: {
      id: cartItemId,
    },
  });

  return item;
};

exports.updateCartItem = async (cartItemId, newQuantity, newAttribute) => {
  const updatedItem = await prisma.shoppingCartItem.update({
    where: {
      id: parseInt(cartItemId)
    },
    data: {
      quantity: newQuantity !== undefined ? newQuantity : undefined,
      attribute: newAttribute !== undefined ? newAttribute : undefined,
    },
  });

  return updatedItem;
};

exports.deleteCartItem = async (cartItemId) => {
  const item = await prisma.shoppingCartItem.findUnique({
    where: {
      id: cartItemId,
    },
  });

  if (!item) {
    throw new Error("Item not found");
  }

  return await prisma.shoppingCartItem.delete({
    where: {
      id: cartItemId,
    },
  });
};

exports.deleteCart = async (cartId) => {
  return await prisma.shoppingCartItem.deleteMany({
    where: {
      cartId: parseInt(cartId),
    },
  });
}


//test

// updateCartItem(1, 8, 11).then((item) => {
//   console.log(item);
// });

// findCartItem(1, 8).then((item) => {
//   console.log(item);
// });
// addItemToCart(1, 1, 2, "RED").then((item) => {
//   console.log(item);
// });

// getCartItems(1).then((cartItems) => {
//   console.log(cartItems);
// });

//test
// const getAllProducts = async () => {
//   return await prisma.product.findMany();
// };

// getAllProducts().then((products) => {
//   console.log(products);
// });

// OH you've found me,
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠈⢻⣿⣿⡄⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀
// ⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀
// ⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀
// ⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀
// ⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀
// ⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀
// ⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
// ⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
// ⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀
// ⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀
// ⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⢠⣿⣿⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⢸⣿⡇⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⣸⣿⠇⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// YOU LIKE JAAAZZ?
// ⠀⠀⠀⠐⠒⠒⠢⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⡄⠀⠀⠀⠀⠀⠀⢠⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⣣⣀⣀⣀⣀⣸⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠛⠛⠛⠛⠛⠛⣭⡭⠴⠤⣍⡻⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠏⣀⣀⣤⢴⠟⠀⠀⠁⠀⠀⠀⠀⠙⢞⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⢺⠭⣿⣦⠄⠀⠀⠀⢀⠔⣾⣿⠉⠱⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠙⠛⠀⠁⠀⠀⠀⠀⠈⠉⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⡸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠐⠢⠀⠀⠀⣠⠤⢢⣄⣀⡀⡇⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⢀⠀⠀⠀⠒⠐⠐⠮⠯⠷⠄⡀⠀⠀⠉⣭⣴⣶⣴⣿⣿⡿⠁⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⢴⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠶⣤⣶⣿⣿⣿⣿⣿⣟⠁⠀⠀⢾⣿⣷⣦⣀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⢸⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠙⢟⣿⣿⣿⠿⠅⠀⠀⠀⣸⡇⢹⣿⣿⣆⣀⠀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠈⡟⡎⡟⠄⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠃⢉⠓⠣⠀⠂⢀⣴⡿⠆⠘⣿⣿⣷⣦⠁⢙⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠳⢷⢹⠀⠀⠀⠀⠀⠀⠀⠀⢱⣤⡀⠀⠈⠂⠠⣀⣠⣶⣿⢟⠏⠀⢠⣿⣿⣿⣿⡂⠘⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣾⣿⣿⣿⢿⣯⠗⠁⠁⢰⣿⣿⣿⣿⣿⡇⠐⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠚⠛⠓⡛⢟⢢⠅⢀⢀⣾⣿⣿⣿⣿⣿⠁⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡄⠀⠀⠐⢠⣲⣒⣟⢳⣿⣿⣿⣿⣿⣿⡏⣠⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣦⣇⣽⣽⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⡛⠛⠛⠛⠛⠋⠉⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣧⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣧⡀⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠷⣦⣤⣤⣤⣤⣤⣼⣿⣧⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠻⠿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠛⠿⢿⣿⣿⣿⣦⣄⣀⣀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⡇⠀⠀⠀⠉⠙⠻⣿⣿⣿⡇⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⢙⣛⣿⠁⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣧⠀⠀⠀⠀⠀⠀⢸⠷⢿⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣧⣻⣦⡀⠀⠀⠀⠛⢛⠟⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠡⠤⠤⠄⠀⠠⠶
