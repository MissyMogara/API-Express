const express = require('express');
const seriesController = require('../controllers/series');

const api = express.Router();

api.post("/series", seriesController.createSerie);

module.exports = api;