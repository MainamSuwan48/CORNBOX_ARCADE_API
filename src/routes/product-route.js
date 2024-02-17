const express = require("express");

const productController = require("../controller/product-controller");

router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

module.exports = router;
