#!/bin/bash

# Create folders
mkdir -p src/config src/models src/controllers src/routes src/services src/middleware db

# Create main files
touch docker-compose.yml Dockerfile .env package.json

# Create src files
touch src/app.js src/server.js
touch src/config/db.js
touch src/models/Flight.js src/models/Attraction.js
touch src/controllers/searchController.js src/controllers/detailsController.js
touch src/routes/searchRoutes.js src/routes/detailsRoutes.js
touch src/services/bookingApiService.js
touch src/middleware/errorHandler.js

# Create db file
touch db/init.sql

echo "Folder structure and files created successfully"
