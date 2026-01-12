const db = require("../config/db");

exports.createFlight = async (flight) => {
  const query = `
    INSERT INTO flights 
    (flight_name, departure_airport, arrival_airport, departure_time, arrival_time, flight_logo, fare, country)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  `;
  await db.query(query, [
    flight.name,
    flight.departure,
    flight.arrival,
    flight.departureTime,
    flight.arrivalTime,
    flight.logo,
    flight.fare,
    flight.country
  ]);
};
