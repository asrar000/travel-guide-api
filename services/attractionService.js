const axios = require('axios');
require('dotenv').config();

class AttractionService {
    constructor() {
        this.apiKey = process.env.BOOKING_API_KEY;
        this.apiHost = process.env.BOOKING_API_HOST;
        this.baseUrl = 'https://booking-com15.p.rapidapi.com/api/v1';
    }

    async searchAttractions(location, page = '1') {
        try {
            if (!this.apiKey || this.apiKey.includes('YOUR_')) {
                throw new Error('No valid RapidAPI key found in .env file');
            }

            console.log(`🔍 Searching attractions for: ${location}`);
            
            // Step 1: Get location ID
            const locationId = await this.getLocationId(location);
            
            if (!locationId) {
                throw new Error(`Could not find location ID for ${location}`);
            }

            // Step 2: Search attractions
            const response = await axios.get(`${this.baseUrl}/attractions/searchAttractions`, {
                params: {
                    location_id: locationId,
                    page: page,
                    languagecode: 'en-us'
                },
                headers: {
                    'x-rapidapi-key': this.apiKey,
                    'x-rapidapi-host': this.apiHost
                }
            });

            return response.data;
            
        } catch (error) {
            console.error('Attraction service error:', error.message);
            if (error.response) {
                console.error('API Response:', error.response.status, error.response.data);
            }
            throw error;
        }
    }

    async getLocationId(location) {
        try {
            const response = await axios.get(`${this.baseUrl}/attractions/searchLocation`, {
                params: {
                    query: location
                },
                headers: {
                    'x-rapidapi-key': this.apiKey,
                    'x-rapidapi-host': this.apiHost
                }
            });

            return response.data[0]?.location_id || null;
            
        } catch (error) {
            console.error(`Error getting location ID for ${location}:`, error.message);
            return null;
        }
    }

    async getAttractionDetails(slug) {
        try {
            const response = await axios.get(`${this.baseUrl}/attractions/getAttractionDetails`, {
                params: {
                    slug: slug,
                    languagecode: 'en-us'
                },
                headers: {
                    'x-rapidapi-key': this.apiKey,
                    'x-rapidapi-host': this.apiHost
                }
            });

            return response.data;
            
        } catch (error) {
            console.error('Error getting attraction details:', error.message);
            throw error;
        }
    }
}

module.exports = new AttractionService();