// Database Initialization Script
console.log('=== Database Initialization ===\n');

async function initializeDatabase() {
    try {
        // Load db from root
        const sequelize = require('../db');
        console.log('✅ db.js loaded successfully');
        
        // Load models - path from scripts/ to src/models/
        const Flight = require('../src/models/Flight');
        const Attraction = require('../src/models/Attraction');
        console.log('✅ Models loaded successfully');
        
        // 1. Test database connection
        console.log('🔗 Step 1: Testing database connection...');
        await sequelize.authenticate();
        console.log('✅ Database connection successful!\n');
        
        // 2. Sync models (create tables)
        console.log('🔄 Step 2: Creating database tables...');
        await sequelize.sync({ force: false, alter: true });
        console.log('✅ Database tables created/updated!\n');
        
        // 3. Display database info
        console.log('📊 Database Information:');
        console.log(`   Database: ${sequelize.config.database}`);
        console.log(`   Host: ${sequelize.config.host}`);
        console.log(`   Port: ${sequelize.config.port}`);
        console.log(`   User: ${sequelize.config.username}`);
        
        console.log('\n🎉 Database initialization completed successfully!');
        console.log('\nNext steps:');
        console.log('1. Start server: npm start');
        console.log('2. Test: curl http://localhost:3000/health');
        
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Database initialization failed!');
        console.error('Error:', error.message);
        
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Check Docker PostgreSQL: docker ps');
        console.log('2. Check .env file has correct credentials');
        console.log('3. Make sure database/user exists');
        
        process.exit(1);
    }
}

initializeDatabase();