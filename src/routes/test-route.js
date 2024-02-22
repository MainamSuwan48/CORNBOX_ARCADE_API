const express = require("express");
const testController = require("../controller/test-controller");
const upload = require("../middlewares/upload");

const router = express.Router();
router.post("/upload", upload.single("image"), testController.uploadTest);

module.exports = router;
