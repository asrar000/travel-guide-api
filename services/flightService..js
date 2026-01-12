const axios = require('axios');
require('dotenv').config();

class FlightService {
    constructor() {
        this.apiKey = process.env.BOOKING_API_KEY;
        this.apiHost = process.env.BOOKING_API_HOST;
        this.baseUrl = 'https://booking-com15.p.rapidapi.com/api/v1';
    }

    async searchFlights(fromLocation, toLocation) {
        try {
            if (!this.apiKey || this.apiKey.includes('YOUR_')) {
                throw new Error('No valid RapidAPI key found');
            }
            
            // Example API call (adjust based on actual API)
            const response = await axios.get(`${this.baseUrl}/flights/searchFlights`, {
                params: {
                    fromId: 'BOM.AIRPORT',
                    toId: 'DEL.AIRPORT',
                    departDate: '2024-12-25'
                },
                headers: {
                    'x-rapidapi-key': this.apiKey,
                    'x-rapidapi-host': this.apiHost
                }
            });
            
            return response.data;
            
        } catch (error) {
            console.error('Flight service error:', error.message);
            throw error;
        }
    }
}

module.exports = new FlightService();