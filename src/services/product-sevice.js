const prisma = require("../models/prisma");



exports.createProduct = async (product) => {
  return await prisma.product.create({
    data: product,
  });
};

