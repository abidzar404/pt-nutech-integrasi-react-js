const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/productController");

router.get("/", Controller.readProducts);
router.post("/", Controller.createProduct);
router.put("/:productId", Controller.updateProduct);
router.delete("/:productId", Controller.deleteProduct);

module.exports = router;
