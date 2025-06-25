const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// POST /api/orders → Save an order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order({ items: req.body.items });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error placing order" });
  }
});

// GET /api/orders → Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ placedAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;

