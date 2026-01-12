const axios = require('axios');
require('dotenv').config();

async function testAPI() {
    console.log('Testing Booking.com API...\n');
    
    const apiKey = process.env.BOOKING_API_KEY;
    const apiHost = process.env.BOOKING_API_HOST;
    
    if (!apiKey || apiKey.includes('YOUR_')) {
        console.log('❌ No valid API key in .env');
        return;
    }
    
    console.log('API Key present:', apiKey.substring(0, 10) + '...');
    
    // Test 1: Flight destination search
    console.log('\n1. Testing flight destination search for "Paris"...');
    try {
        const flightOptions = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination',
            params: { query: 'Paris' },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        };
        
        const flightResponse = await axios.request(flightOptions);
        console.log('✅ Flight API response status:', flightResponse.status);
        console.log('Response data:', JSON.stringify(flightResponse.data, null, 2));
        
    } catch (error) {
        console.log('❌ Flight API error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 2: Attraction location search
    console.log('\n2. Testing attraction location search for "Paris"...');
    try {
        const attractionOptions = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/attractions/searchLocation',
            params: { query: 'Paris' },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        };
        
        const attractionResponse = await axios.request(attractionOptions);
        console.log('✅ Attraction API response status:', attractionResponse.status);
        console.log('Response data:', JSON.stringify(attractionResponse.data, null, 2));
        
    } catch (error) {
        console.log('❌ Attraction API error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 3: Try with airport code
    console.log('\n3. Testing with airport code "CDG"...');
    try {
        const airportOptions = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination',
            params: { query: 'CDG' },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        };
        
        const airportResponse = await axios.request(airportOptions);
        console.log('✅ Airport code response:', airportResponse.status);
        console.log('Data:', JSON.stringify(airportResponse.data, null, 2));
        
    } catch (error) {
        console.log('❌ Airport code error:', error.response?.status, error.response?.data || error.message);
    }
}

testAPI();