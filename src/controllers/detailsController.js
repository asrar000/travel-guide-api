const Flight = require('../models/Flight');
const Attraction = require('../models/Attraction');

exports.getDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const searchType = req.query.searchtype;
        
        console.log(`🔍 Getting details for ID: ${id}, Type: ${searchType}`);
        
        if (!searchType || !['flight', 'attraction'].includes(searchType.toLowerCase())) {
            return res.status(400).json({
                error: 'Invalid search type',
                message: 'searchtype must be "flight" or "attraction"'
            });
        }
        
        if (searchType.toLowerCase() === 'flight') {
            const flight = await Flight.findByPk(id);
            
            if (flight) {
                return res.status(200).json({
                    GeolInfo: {
                        name: flight.location,
                        country: flight.country,
                        type: "flight"
                    },
                    Flight: flight
                });
            }
            
            // Return mock data if not in DB
            return res.status(200).json({
                GeolInfo: {
                    name: "Flight Location Info",
                    country: "US",
                    type: "flight"
                },
                Flight: {
                    id: id,
                    flightName: "Mock Airlines Flight " + id,
                    departureAirport: "JFK",
                    arrivalAirport: "LAX",
                    departureTime: new Date().toISOString(),
                    arrivalTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
                    fare: 350.50,
                    currency: "USD",
                    duration: "6h 15m",
                    stops: 0,
                    aircraft: "Boeing 737"
                }
            });
            
        } else {
            const attraction = await Attraction.findByPk(id);
            
            if (attraction) {
                return res.status(200).json({
                    GeolInfo: {
                        name: attraction.city,
                        country: attraction.country,
                        type: "attraction"
                    },
                    Attraction: attraction
                });
            }
            
            // Return mock data if not in DB
            return res.status(200).json({
                GeolInfo: {
                    name: "Attraction Location Info",
                    country: "US",
                    city: "New York",
                    type: "attraction"
                },
                Attraction: {
                    id: id,
                    attractionName: "Mock Attraction " + id,
                    attractionSlug: "mock-attraction-" + id,
                    additionalInfo: "This is a mock attraction for testing",
                    price: 75.00,
                    currency: "USD",
                    whatsIncluded: "Entrance fee, Guide",
                    rating: 4.5,
                    reviewsCount: 120,
                    address: "123 Mock Street, Mock City"
                }
            });
        }
        
    } catch (error) {
        console.error('Details error:', error);
        res.status(500).json({
            error: 'Failed to get details',
            message: error.message
        });
    }
};