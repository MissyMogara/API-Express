const express = require('express');
const multiparty = require('connect-multiparty');
const seriesController = require('../controllers/series');

const md_auth = require('../middlewares/authenticated');
const md_upload_avatar = multiparty({ uploadDir: "./uploads/series"});

const api = express.Router();

api.post("/series", [md_auth.ensureAuth], seriesController.createSerie);
api.get("/series", [md_auth.ensureAuth], seriesController.getSeries);
api.get("/series/toprated", [md_auth.ensureAuth], seriesController.getSeriesOrderedByScore);
api.get('/series/genre/:genero', [md_auth.ensureAuth], seriesController.getSeriesByGenre);
api.get('/series/id/:id', [md_auth.ensureAuth], seriesController.getSerieByID);
api.put('/series/:id', [md_auth.ensureAuth], seriesController.addScore);
api.delete('/series/:id', [md_auth.ensureAuth], seriesController.deleteSerie);
api.put('/series/upload-image/:id', [md_auth.ensureAuth, md_upload_avatar], seriesController.uploadImage);

module.exports = api;