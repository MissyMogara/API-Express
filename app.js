const express = require('express');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir todos los orígenes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
const series_routes = require('./routes/series');
const user_routes = require('./routes/user');

// Rutas base
app.use("/api", series_routes);
app.use("/api", user_routes);

module.exports = app;
