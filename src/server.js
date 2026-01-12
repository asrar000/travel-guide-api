const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes
const searchRoutes = require('./routes/searchRoutes');
const detailsRoutes = require('./routes/detailsRoutes');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/search', searchRoutes);
app.use('/details', detailsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Travel Guide API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: process.env.DB_NAME || 'travel_db'
    });
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({
        message: 'API is working!',
        endpoints: {
            search: 'GET /search/:locationname',
            details: 'GET /details/:id?searchtype=flight/attraction',
            health: 'GET /health'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        message: `Route ${req.method} ${req.url} not found`,
        availableEndpoints: ['/search/:location', '/details/:id', '/health', '/test']
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    🚀 Travel Guide API Server
    📍 Port: ${PORT}
    📁 Environment: ${process.env.NODE_ENV || 'development'}
    🗄️  Database: ${process.env.DB_NAME || 'travel_db'}
    
    🔗 Endpoints:
       Health:   http://localhost:${PORT}/health
       Test:     http://localhost:${PORT}/test
       Search:   http://localhost:${PORT}/search/paris
       Details:  http://localhost:${PORT}/details/1?searchtype=flight
    `);
});