const express = require('express');
const seriesController = require('../controllers/series');

const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post("/series", [md_auth.ensureAuth], seriesController.createSerie);
api.get("/series", [md_auth.ensureAuth], seriesController.getSeries);
api.get("/series/toprated", [md_auth.ensureAuth], seriesController.getSeriesOrderedByScore);
api.get('/series/genre/:genero', [md_auth.ensureAuth], seriesController.getSeriesByGenre);
api.get('/series/id/:id', [md_auth.ensureAuth], seriesController.getSerieByID);
api.put('/series/:id', [md_auth.ensureAuth], seriesController.addScore);
api.delete('/series/:id', [md_auth.ensureAuth], seriesController.deleteSerie);

module.exports = api;