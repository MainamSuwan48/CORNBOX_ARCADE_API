const express = require("express");

const productController = require("../controller/product-controller");

router = express.Router();

router.get("/cart", productController.getCartItems);
router.post("/cart", productController.addToCartOrCreateCart);
router.get("/cart/", productController.findCartItem);
router.put("/cart", productController.updateCartItem);
router.delete("/cart", productController.deleteCartItem);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);


module.exports = router;
