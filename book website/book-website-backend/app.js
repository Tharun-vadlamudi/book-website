require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// Server Configuration
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
  =================================
  🚀 Server running in ${ENV} mode
  🔗 http://localhost:${PORT}
  =================================
  `);
});

module.exports = app; // For testing