const Flight = require('../models/Flight');
const Attraction = require('../models/Attraction');
const flightService = require('../../services/flightService');
const attractionService = require('../../services/attractionService');

exports.searchByLocation = async (req, res) => {
    try {
        const locationName = req.params.locationname;
        
        console.log(`🔍 Searching for location: ${locationName}`);
        
        // Check if we have a real API key
        if (!process.env.BOOKING_API_KEY || process.env.BOOKING_API_KEY.includes('YOUR_')) {
            return res.status(200).json({
                GeolInfo: {
                    name: locationName,
                    searchTime: new Date().toISOString(),
                    note: "Add real RapidAPI key to .env for Booking.com data"
                },
                Flights: [],
                Attractions: []
            });
        }
        
        // Fetch real data in parallel
        let flights = [];
        let attractions = [];
        let errors = [];
        
        try {
            // Get flights (using same location for simplicity)
            const flightsData = await flightService.searchFlights(locationName, 'LONDON');
            flights = await this.processFlights(flightsData, locationName);
        } catch (flightError) {
            errors.push(`Flights: ${flightError.message}`);
        }
        
        try {
            // Get attractions
            const attractionsData = await attractionService.searchAttractions(locationName);
            attractions = await this.processAttractions(attractionsData, locationName);
        } catch (attractionError) {
            errors.push(`Attractions: ${attractionError.message}`);
        }
        
        // Prepare response
        const response = {
            GeolInfo: {
                name: locationName,
                country: locationName, // Would get from API in real implementation
                searchTime: new Date().toISOString(),
                totalFlights: flights.length,
                totalAttractions: attractions.length,
                ...(errors.length > 0 && { errors: errors })
            },
            Flights: flights,
            Attractions: attractions
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            error: 'Failed to search location',
            message: error.message
        });
    }
};

exports.processFlights = async (apiData, location) => {
    try {
        const flightsToSave = [];
        
        // Extract flights from API response
        // Adjust based on actual API response structure
        const flights = apiData.data?.flights || apiData.flights || [];
        
        for (const flight of flights.slice(0, 5)) { // Limit to 5 flights
            const flightData = {
                flightName: flight.airline || flight.airline_name || 'Unknown Airline',
                departureAirport: flight.departure_airport || flight.origin || location + ' Airport',
                arrivalAirport: flight.arrival_airport || flight.destination || 'Unknown',
                departureTime: new Date(flight.departure_time || Date.now()),
                arrivalTime: new Date(flight.arrival_time || Date.now() + 5 * 60 * 60 * 1000),
                flightLogo: flight.airline_logo || '',
                fare: flight.price || flight.fare || 0,
                currency: flight.currency || 'USD',
                location: location,
                country: location, // Simplified
                flightToken: flight.token || flight.flight_token || '',
                duration: flight.duration || 'Unknown',
                stops: flight.stops || 0
            };

            // Save to database
            try {
                const savedFlight = await Flight.create(flightData);
                flightsToSave.push(savedFlight.toJSON());
            } catch (dbError) {
                console.error('Error saving flight to DB:', dbError.message);
            }
        }

        return flightsToSave;
        
    } catch (error) {
        console.error('Process flights error:', error);
        return [];
    }
};

exports.processAttractions = async (apiData, location) => {
    try {
        const attractionsToSave = [];
        
        // Extract attractions from API response
        const attractions = apiData.data?.attractions || apiData.attractions || [];
        
        for (const attraction of attractions.slice(0, 5)) { // Limit to 5 attractions
            const attractionData = {
                attractionName: attraction.name || attraction.title || 'Unknown Attraction',
                attractionSlug: attraction.slug || `attraction-${Date.now()}`,
                additionalInfo: attraction.description || attraction.additional_info || '',
                cancellationPolicy: attraction.cancellation_policy || 'Check provider',
                images: attraction.images || [attraction.image_url] || [],
                price: attraction.price || attraction.cost || 0,
                currency: attraction.currency || 'USD',
                whatsIncluded: attraction.included || attraction.whats_included || '',
                country: location,
                city: location,
                rating: attraction.rating || 0,
                reviewsCount: attraction.reviews_count || 0,
                address: attraction.address || 'Address not available'
            };

            // Save to database
            try {
                const savedAttraction = await Attraction.create(attractionData);
                attractionsToSave.push(savedAttraction.toJSON());
            } catch (dbError) {
                console.error('Error saving attraction to DB:', dbError.message);
            }
        }

        return attractionsToSave;
        
    } catch (error) {
        console.error('Process attractions error:', error);
        return [];
    }
};