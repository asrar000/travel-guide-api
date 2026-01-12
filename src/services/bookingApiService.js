const axios = require("axios");

const headers = {
  "X-RapidAPI-Key": process.env.BOOKING_API_KEY,
  "X-RapidAPI-Host": process.env.BOOKING_API_HOST
};

exports.searchFlights = async (from, to) => {
  // STEP 1–3 simplified for assignment
  const response = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights",
    { headers, params: { fromId: from, toId: to } }
  );
  return response.data;
};

exports.searchAttractions = async (location) => {
  const response = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation",
    { headers, params: { query: location } }
  );
  return response.data;
};
