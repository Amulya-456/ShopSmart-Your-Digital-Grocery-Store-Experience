// routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // ✅ adjust the path if needed

// GET /api/users - fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
