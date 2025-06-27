const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, phone, address, paymentMethod, items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid or empty order items" });
    }

    const newOrder = new Order({
      firstName,
      lastName,
      phone,
      address,
      paymentMethod,
      items,
      total,
      placedAt: new Date(),
      status: "Pending"
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });

  } catch (err) {
    console.error("❌ Order error:", err.message);
    res.status(500).json({ message: "Error placing order" });
  }
});

module.exports = router;
