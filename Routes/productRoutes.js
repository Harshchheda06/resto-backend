const express = require("express");
const { uploadProduct, getProducts } = require("../Controllers/productController");

const router = express.Router();

router.post("/uploadProduct", uploadProduct);
router.get("/", getProducts);

module.exports = router;
