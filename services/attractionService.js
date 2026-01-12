const axios = require('axios');
require('dotenv').config();

class AttractionService {
    constructor() {
        this.apiKey = process.env.BOOKING_API_KEY;
        this.apiHost = process.env.BOOKING_API_HOST;
        this.baseUrl = 'https://booking-com15.p.rapidapi.com/api/v1';
    }

    async searchAttractions(location) {
        try {
            if (!this.apiKey || this.apiKey.includes('YOUR_')) {
                throw new Error('No valid RapidAPI key found');
            }
            
            // Example API call
            const response = await axios.get(`${this.baseUrl}/attractions/searchAttractions`, {
                params: {
                    location_id: '1772', // Example location ID
                    page: '1'
                },
                headers: {
                    'x-rapidapi-key': this.apiKey,
                    'x-rapidapi-host': this.apiHost
                }
            });
            
            return response.data;
            
        } catch (error) {
            console.error('Attraction service error:', error.message);
            throw error;
        }
    }
}

module.exports = new AttractionService();