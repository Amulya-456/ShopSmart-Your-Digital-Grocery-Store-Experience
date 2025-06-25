const express = require('express');
const router = express.Router();
const User = require('../models/user');

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, msg: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, msg: "Signup failed" });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.json({ success: false, msg: "Invalid credentials" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, msg: "Login failed" });
  }
});

// ✅ Forgot Password Route
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, msg: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, msg: "Reset failed" });
  }
});

// ✅ Export router to be used in server.js
module.exports = router;
