const express = require("express");
const searchRoutes = require("./routes/searchRoutes");
const detailsRoutes = require("./routes/detailsRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/search", searchRoutes);
app.use("/details", detailsRoutes);

app.use(errorHandler);

module.exports = app;
