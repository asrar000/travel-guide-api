const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration from .env
const sequelize = new Sequelize(
    process.env.DB_NAME || 'travel_db',
    process.env.DB_USER || 'travel_user',
    process.env.DB_PASSWORD || 'travel_pass',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;