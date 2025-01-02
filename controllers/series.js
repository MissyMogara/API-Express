const Series = require("../models/series");

// Create a new serie
async function createSerie(req, res) {
    console.log("Creando serie");
    const serie = new Series();
    const param = req.body

    serie.titulo = param.titulo;
    serie.descripcion = param.descripcion;
    serie.miPuntuacion = param.miPuntuacion;
    serie.esMiniSerie = param.esMiniSerie;
    serie.nTemporadas = param.nTemporadas;
    serie.year = param.year;
    serie.genero = param.genero;
    serie.puntuacionTotal = param.puntuacionTotal;
    serie.imagen = param.imagen;

    try {
        const serieStore = await serie.save();

        if(!serieStore){
            res.status(404).send({
                message: "No se pudo guardar la serie."
            });
        } else {
            res.status(200).send({
                serie: serieStore
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get all series
async function getSeries(req, res) {
    try {
        const series = await Series.find();

        if(!series) {
            res.status(404).send({
                message: "Error al obtener las series."
            });
        } else {
            res.status(200).send(series);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get all series ordered by score
async function getSeriesOrderedByScore(req, res) {
    try {
        const series = await Series.find().sort({ puntuacionTotal: -1 }).limit(10);

        if(!series) {
            res.status(404).send({
                message: "Error al obtener las series."
            });
        } else {
            res.status(200).send(series);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get series by category
async function getSeriesByGenre(req, res) {
    try {
        const { genero } = req.params;

        const series = await Series.find({ genero: genero });

        if(!series) {
            res.status(404).send({
                message: `Error al obtener las series del genero ${genero}`
            });
        } else {
            res.status(200).send(series);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a single serie by ID
async function getSerieByID(req, res) {
    const serieID = req.params.id;

    try {

        const serie = await Series.findById(serieID);  

        if(!serie) {
            res.status(404).send({
                message: "No se encontró la serie."
            });
        } else {
            res.status(200).send(serie);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Add more score to a single serie
async function addScore(req, res) {
    const serieID = req.params.id;
    const newScore = req.body.puntuacionTotal;
    
    try {
        const serie = await Series.findByIdAndUpdate(serieID, { $set: { puntuacionTotal: newScore } });

        if(!serie) {
            res.status(404).send({
                message: "No se encontró la serie."
            });
        } else {
            res.status(200).send({
                message: "Puntaje añadido correctamente."
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }

}

// Delete a serie from the database
async function deleteSerie(req, res) {
    const serieID = req.params.id;
    
    try {
        const serie = await Series.findByIdAndDelete(serieID);

        if(!serie) {
            res.status(404).send({
                message: "No se encontró la serie."
            });
        } else {
            res.status(200).send({
                message: "Serie eliminada correctamente."
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createSerie,
    getSeries,
    getSeriesOrderedByScore,
    getSeriesByGenre,
    getSerieByID,
    addScore,
    deleteSerie,
};

