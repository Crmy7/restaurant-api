const express = require("express");
const router = express.Router();

const createOrder = require("../../services/order/createOrder");
const getOrders = require("../../services/order/getOrders");

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

module.exports = router;

