const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
const hello_routes = require('./routes/hello');
const series_routes = require('./routes/series');

// Rutas base
app.use("/api", hello_routes);
app.use("/api", series_routes);

module.exports = app;
