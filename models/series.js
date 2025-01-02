const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create a new Schema

const SeriesSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    miPuntuacion: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    esMiniSerie: {
        type: Boolean,
        default: false,
        required: true
    },
    nTemporadas: {
        type: Number,
        min: 1,
        required: true
    },
    year: {
        type: Number,
        min: 1900,
        required: true
    },
    genero: {
        type: String,
        enum: ['DRAMA', 'TERROR', 'SCIFI', 'HISTORIA', 'ACCION', 'COMEDIA', 'FANTASIA'],
        required: true
    },
    puntuacionTotal: {
        type: Number,
        default: 0,
        required: true
    },
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Series', SeriesSchema); // Export the model