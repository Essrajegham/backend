require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // Vérifiez ce chemin

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/User/auth', authRoutes);
app.use(productRoutes); // Vérifiez si vous utilisez productRoutes ici

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/ping', (req, res) => {
    res.send('pong');
  });