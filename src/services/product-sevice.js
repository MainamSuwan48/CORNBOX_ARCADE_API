const prisma = require("../models/prisma");

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
