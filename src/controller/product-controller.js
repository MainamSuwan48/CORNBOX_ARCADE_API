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

exports.addToCartOrCreateCart = catchError(async (req, res) => {
    const { userId, productItemId, quantity, attribute } = req.body;
  let cart = await userHasCart(userId);

  if (!cart) {
    // Create a new cart for the user
    cart = await prisma.shoppingCart.create({
      data: {
        userId: userId,
      },
    });
  }

  // Add the item to the user's cart
  const newItem = await addItemToCart(
    cart.id,
    productItemId,
    quantity,
    attribute
  );

  return newItem;
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
  const { cartId, cartItemId, newQuantity} = req.body;
  const updatedItem = await productService.updateCartItem(cartId, cartItemId, newQuantity);
  res.status(200).json(updatedItem);
});

exports.deleteCartItem = catchError(async (req, res) => {
  const { cartItemId } = req.body;
  const deletedItem = await productService.deleteCartItem(cartItemId);
  res.status(200).json(deletedItem);
});
