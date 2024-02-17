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

//shopping cart

exports.creteCartForUser = catchError(async (req, res) => {
  const hasCart = await productService.userHasCart(userId);
  if (hasCart) {
    const { userId } = req.body;
    const cart = await productService.createCartForUser(userId);
    res.status(201).json(cart);
  } else {
    createError("User already has a cart", 400);
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
  const { userId } = req.body;
  const cartItems = await productService.getCartItems(userId);
  res.status(200).json(cartItems);
});

exports.findCartItem = catchError(async (req, res) => {
  const { cartItemId } = req.body;
  const item = await productService.findCartItem(cartItemId);
  res.status(200).json(item);
});

exports.updateCartItem = catchError(async (req, res) => {
  const {  cartItemId, quantity } = req.body;
  const updatedItem = await productService.updateCartItem(    
    cartItemId,
    quantity
  );
  res.status(200).json(updatedItem);
});

exports.deleteCartItem = catchError(async (req, res) => {
  const { cartItemId } = req.body;
  const deletedItem = await productService.deleteCartItem(cartItemId);
  res.status(200).json(deletedItem);
});
