const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ✅ ADD THIS LINE (for placing orders)
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://ammu:Amulya09@cluster0.pswzycq.mongodb.net/shopsmart?retryWrites=true&w=majority')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => {
      console.log('🚀 Server running at http://localhost:5000');
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
