const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Auth route
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ✅ Order route
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes); // ✅ This must exist

// 👇 MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopsmart')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => {
      console.log('🚀 Server running at http://localhost:5000');
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
