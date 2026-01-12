CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  flight_name TEXT,
  departure_airport TEXT,
  arrival_airport TEXT,
  departure_time TIMESTAMP,
  arrival_time TIMESTAMP,
  flight_logo TEXT,
  fare NUMERIC,
  country TEXT
);

CREATE TABLE attractions (
  id SERIAL PRIMARY KEY,
  name TEXT,
  slug TEXT,
  additional_info TEXT,
  cancellation_policy TEXT,
  images JSONB,
  price NUMERIC,
  includes TEXT,
  country TEXT,
  city TEXT
);
