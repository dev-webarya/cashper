const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files (uploaded documents)
app.use('/uploads', express.static(uploadsDir));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Import Routes
const loanRoutes = require('./routes/loanRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: ' Cashper API is running',
    timestamp: new Date().toISOString(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to  Cashper API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      loans: '/api/loans',
      auth: '/api/auth',
      dashboard: '/api/dashboard'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

// Start Server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});



