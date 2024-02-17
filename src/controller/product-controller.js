const catchError = require("../utilities/catch-error");
const createError = require("../utilities/create-error");
const productService = require("../services/product-sevice");

exports.getAllProducts = catchError(async (req, res) => {
  const products = await productService.getAllProducts();
  if (!products) {
    createError("Products not found", 404);
  }
  res.status(200).json(products);
});

exports.getProductById = catchError(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (!product) {
    createError("Product not found", 404);
  }
  res.status(200).json(product);
});
