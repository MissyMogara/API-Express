const express = require('express');
const seriesController = require('../controllers/series');

const api = express.Router();

api.post("/series", seriesController.createSerie);
api.get("/series", seriesController.getSeries);
api.get("/series/toprated", seriesController.getSeriesOrderedByScore);
api.get('/series/genre/:genero', seriesController.getSeriesByGenre);
api.get('/series/id/:id', seriesController.getSerieByID);
api.put('/series/:id', seriesController.addScore);
api.delete('/series/:id', seriesController.deleteSerie);

module.exports = api;