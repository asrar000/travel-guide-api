// scripts/fetchData.js - Data retrieval demonstration
require('dotenv').config();
const flightService = require('../services/flightService');
const attractionService = require('../services/attractionService');

async function fetchAndDisplayData() {
    console.log('=== Data Retrieval Demonstration ===\n');
    
    // Check API key
    if (!process.env.BOOKING_API_KEY || process.env.BOOKING_API_KEY.includes('YOUR_')) {
        console.log('❌ No valid API key found in .env');
        console.log('Get one from: https://rapidapi.com/tipsters/api/booking-com15');
        return;
    }

    const testLocation = 'Paris';
    
    try {
        console.log(`1. Fetching flights for ${testLocation}...`);
        const flights = await flightService.searchFlights(testLocation, testLocation);
        console.log(`   ✅ Found ${flights.length} flights`);
        
        if (flights.length > 0) {
            console.log('   Sample flight:', {
                airline: flights[0].airline,
                from: flights[0].departure_airport,
                to: flights[0].arrival_airport,
                price: flights[0].price
            });
        }
        
        console.log(`\n2. Fetching attractions for ${testLocation}...`);
        const attractions = await attractionService.searchAttractions(testLocation);
        console.log(`   ✅ Found ${attractions.length} attractions`);
        
        if (attractions.length > 0) {
            console.log('   Sample attraction:', {
                name: attractions[0].name,
                price: attractions[0].price,
                rating: attractions[0].rating
            });
        }
        
        console.log('\n🎉 Data retrieval demonstration complete!');
        console.log('\nNow test the API endpoints:');
        console.log('curl http://localhost:3000/search/paris');
        console.log('curl "http://localhost:3000/details/1?searchtype=flight"');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

fetchAndDisplayData();