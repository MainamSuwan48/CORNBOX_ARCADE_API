const express = require("express");

const productController = require("../controller/product-controller");

router = express.Router();
router.post("/cart/create", productController.createCartForUser);
router.get("/cart/:userId", productController.getCartItems);
router.post("/cart/add", productController.addItemToCart);
router.get("/cart/item", productController.findCartItem);
router.put("/cart/item/:cartItemId", productController.updateCartItem);
router.delete("/cart/item/:cartItemId", productController.deleteCartItem);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);


module.exports = router;
