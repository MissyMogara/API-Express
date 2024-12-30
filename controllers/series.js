const Series = require("../models/series");

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
            res.status(400).send({
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

module.exports = {
    createSerie,
};