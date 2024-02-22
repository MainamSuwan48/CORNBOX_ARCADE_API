const express = require("express");

const productController = require("../controller/product-controller");
const upload = require("../middlewares/upload");

router = express.Router();
router.post("/cart/create", productController.createCartForUser);
router.get("/cart/:userId", productController.getCartItems);
router.post("/cart/add", productController.addItemToCart);
router.get("/cart/item", productController.findCartItem);
router.put("/cart/item/:cartItemId", productController.updateCartItem);
router.delete("/cart/item/:cartItemId", productController.deleteCartItem);
router.delete("/cart/:cartId", productController.deleteCart);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:productId", productController.updateStock);
router.post(
  "/upload/:productId",
  upload.single("image"),
  productController.uploadProductImage
);
router.get("/image/get", productController.getAllProductImages);

module.exports = router;
