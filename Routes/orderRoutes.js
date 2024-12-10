const express = require("express");
const { createOrder, getAllOrders } = require("../Controllers/orderController");

const router = express.Router();

// Route to create a new order

router.post("/", createOrder);

// Route to fetch all orders (Admin only)
router.get("/getAllOrders", getAllOrders);

module.exports = router;
