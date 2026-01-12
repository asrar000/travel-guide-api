const Flight = require('../models/Flight');
const Attraction = require('../models/Attraction');

exports.searchByLocation = async (req, res) => {
    try {
        const locationName = req.params.locationname;
        
        console.log(`🔍 Searching for location: ${locationName}`);
        
        // Check if API key is available
        const hasApiKey = process.env.BOOKING_API_KEY && 
                         !process.env.BOOKING_API_KEY.includes('YOUR_');
        
        if (!hasApiKey) {
            // Return mock data if no API key
            const mockResponse = {
                GeolInfo: {
                    name: locationName,
                    country: "Country of " + locationName,
                    searchTime: new Date().toISOString(),
                    note: "Mock data - Add real RapidAPI key to .env"
                },
                Flights: [
                    {
                        id: 1,
                        flightName: "Mock Airlines",
                        departureAirport: `${locationName} International Airport`,
                        arrivalAirport: "Destination Airport",
                        departureTime: new Date().toISOString(),
                        arrivalTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
                        fare: 299.99,
                        currency: "USD"
                    }
                ],
                Attractions: [
                    {
                        id: 1,
                        attractionName: `Popular Attraction in ${locationName}`,
                        attractionSlug: `attraction-${locationName.toLowerCase()}`,
                        price: 49.99,
                        currency: "USD",
                        city: locationName
                    }
                ]
            };

            return res.status(200).json(mockResponse);
        }
        
        // Real implementation would fetch from Booking.com API
        // For now, return empty arrays
        res.status(200).json({
            GeolInfo: {
                name: locationName,
                searchTime: new Date().toISOString(),
                note: "API key found but implementation incomplete"
            },
            Flights: [],
            Attractions: []
        });
        
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            error: 'Failed to search location',
            message: error.message
        });
    }
};