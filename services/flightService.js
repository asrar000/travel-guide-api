const axios = require('axios');
require('dotenv').config();

class FlightService {
    constructor() {
        this.apiKey = process.env.BOOKING_API_KEY;
        this.apiHost = process.env.BOOKING_API_HOST;
        this.baseUrl = 'https://booking-com15.p.rapidapi.com/api/v1';
        
        // Map city names to airport codes
        this.cityToAirport = {
            'paris': 'CDG',
            'london': 'LHR',
            'new york': 'JFK',
            'delhi': 'DEL',
            'sydney': 'SYD',
            'tokyo': 'HND',
            'dubai': 'DXB',
            'singapore': 'SIN',
            'bangkok': 'BKK',
            'istanbul': 'IST'
        };
    }

    async getAirportId(location) {
        try {
            console.log(`Searching airport ID for: ${location}`);
            
            // First try the location as-is
            let airportId = await this.searchAirport(location);
            
            // If not found, try airport code
            if (!airportId) {
                const locationLower = location.toLowerCase();
                if (this.cityToAirport[locationLower]) {
                    const airportCode = this.cityToAirport[locationLower];
                    console.log(`Trying airport code: ${airportCode}`);
                    airportId = await this.searchAirport(airportCode);
                }
            }
            
            // If still not found, try city name variations
            if (!airportId) {
                airportId = await this.searchAirport(`${location} airport`);
            }
            
            if (airportId) {
                console.log(`✅ Found airport ID: ${airportId} for ${location}`);
            } else {
                console.log(`❌ No airport ID found for ${location}`);
            }
            
            return airportId;
            
        } catch (error) {
            console.error('Error getting airport ID:', error.message);
            return null;
        }
    }

    async searchAirport(query) {
        try {
            const options = {
                method: 'GET',
                url: `${this.baseUrl}/flights/searchDestination`,
                params: { query: query },
                headers: {
                    'x-rapidapi-key': this.apiKey,
                    'x-rapidapi-host': this.apiHost
                }
            };

            const response = await axios.request(options);
            
            if (response.data?.data && response.data.data.length > 0) {
                // Find airport type (not city)
                const airport = response.data.data.find(item => 
                    item.type === 'AIRPORT' || item.id.includes('.AIRPORT')
                );
                return airport?.id || response.data.data[0]?.id;
            }
            
            return null;
        } catch (error) {
            console.error(`Search for "${query}" failed:`, error.message);
            return null;
        }
    }

    async searchFlights(fromLocation, toLocation) {
        try {
            console.log(`\n🔍 Searching flights: ${fromLocation} → ${toLocation}`);
            
            // Get airport IDs
            const fromId = await this.getAirportId(fromLocation);
            const toId = await this.getAirportId(toLocation);
            
            console.log(`Airport IDs: ${fromId} → ${toId}`);
            
            if (!fromId || !toId) {
                console.log('Could not find airport IDs, using mock data');
                return this.getMockFlights(fromLocation, toLocation);
            }

            // Search flights
            const options = {
                method: 'GET',
                url: `${this.baseUrl}/flights/searchFlights`,
                params: {
                    fromId: fromId,
                    toId: toId,
                    departDate: this.getFutureDate(30), // Further in future for better results
                    adults: '1',
                    currency_code: 'USD'
                },
                headers: {
                    'x-rapidapi-key': this.apiKey,
                    'x-rapidapi-host': this.apiHost
                }
            };

            console.log(`Calling flights API with: ${fromId} → ${toId}`);
            const response = await axios.request(options);
            
            if (response.data?.data?.flights && response.data.data.flights.length > 0) {
                console.log(`✅ Found ${response.data.data.flights.length} real flights`);
                return response.data.data.flights;
            } else {
                console.log('No flights found in API response, using mock data');
                return this.getMockFlights(fromLocation, toLocation);
            }
            
        } catch (error) {
            console.error('Error searching flights:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
            return this.getMockFlights(fromLocation, toLocation);
        }
    }

    getFutureDate(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }

    getMockFlights(from, to) {
        console.log(`📦 Returning mock flights for ${from} → ${to}`);
        return [
            {
                airline: "Air France",
                airline_name: "Air France",
                departure_airport: `${from} Airport`,
                arrival_airport: `${to} Airport`,
                departure_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                arrival_time: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString(),
                price: 299.99,
                total_fare: 299.99,
                currency: "USD",
                token: "mock-flight-token-af123",
                duration: "3h",
                stops: 0,
                airline_logo: "https://logo.clearbit.com/airfrance.com"
            }
        ];
    }
}

module.exports = new FlightService();