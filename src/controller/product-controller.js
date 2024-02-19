const createError = require("../utilities/create-error");
const productService = require("../services/product-sevice");
const catchError = require("../utilities/catch-error");
const { parse } = require("dotenv");

exports.getAllProducts = catchError(async (req, res) => {
  const products = await productService.getAllProducts();
  if (!products) {
    createError("Products not found", 404);
  }
  res.status(200).json(products);
});

exports.getProductById = catchError(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const product = await productService.getProductById(id);
  if (!product) {
    createError("Product not found", 404);
  }
  res.status(200).json(product);
});

//shopping cart

exports.createCartForUser = catchError(async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await productService.createCartForUser(userId);
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    throw new Error("Error creating cart");
  }
});

exports.addItemToCart = catchError(async (req, res) => {
  const { cartId, productItemId, quantity, attribute } = req.body;
  const newItem = await productService.addItemToCart(
    cartId,
    productItemId,
    quantity,
    attribute
  );

  res.status(201).json(newItem);
});

exports.getCartItems = catchError(async (req, res) => {
  const { userId } = req.params;
  console.log(req.params, "***********");
  const cartItems = await productService.getCartItems(userId);
  res.status(200).json(cartItems);
});

exports.findCartItem = catchError(async (req, res) => {
  const { cartItemId } = req.body;
  const item = await productService.findCartItem(cartItemId);
  res.status(200).json(item);
});

exports.updateCartItem = catchError(async (req, res) => {
  const { cartItemId } = req.params;
  console.log(cartItemId, "***********");
  const { quantity } = req.body;
  const updatedItem = await productService.updateCartItem(cartItemId, quantity);
  res.status(200).json(updatedItem);
});

exports.deleteCartItem = catchError(async (req, res) => {
  console.log(req.params);
  const cartItemId = parseInt(req.params.cartItemId);
  const deletedItem = await productService.deleteCartItem(cartItemId);
  res.status(200).json(deletedItem);
});

exports.deleteCart = catchError(async (req, res) => {
  const { cartId } = req.params;
  const deletedCart = await productService.deleteCart(cartId);
  res.status(200).json(deletedCart);
});
