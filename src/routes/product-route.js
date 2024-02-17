const express = require("express");

const productController = require("../controller/product-controller");

router = express.Router();

router.get("/cart", productController.getCartItems);
// router.post("/cart/create", productController.createCartForUser);
router.post("/cart", productController.addItemToCart);
router.get("/cart/item", productController.findCartItem);
router.put("/cart/item", productController.updateCartItem);
router.delete("/cart/item", productController.deleteCartItem);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);


module.exports = router;
