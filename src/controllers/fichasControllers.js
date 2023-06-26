import { Detalles, Fichas, Medicos, Pacientes } from "../models/models.js";


export const crearFicha = async (req, res) => {
    try {
        // Obtener los datos enviados en el cuerpo de la solicitud
        const { fecha, idpaciente, idmedico, detalles } = req.body;

        // Crear una nueva ficha clínica con los datos proporcionados
        const nuevaFichaClinica = await Fichas.create({
            fecha,
            idpaciente,
            idmedico
        });

        // Crear los detalles de la ficha clínica
        const nuevosDetalles = await Promise.all(detalles.map(async (detalle) => {
            const { motivo, diagnostico, tratamiento } = detalle;
            return await Detalles.create({
                motivo,
                diagnostico,
                tratamiento,
                idfichas: nuevaFichaClinica.id
            });
        }));

        // Agregar los detalles a la ficha clínica creada
        nuevaFichaClinica.detalles = nuevosDetalles;

        // Enviar una respuesta de éxito con la ficha clínica creada
        res.status(201).json(nuevaFichaClinica);
    } catch (error) {
        // Enviar una respuesta de error en caso de fallo
        console.error(error);
        res.status(500).json({ error: 'Error al crear la ficha clínica' });
    }
};

export const getFichas = async (req, res) => {
    try {
        const fichas = await Fichas.findAll({
            include:[
                {
                    model: Medicos,
                    attributes: ['nombre', 'apellido', 'especialidad'], 
                },
                {
                    model: Pacientes,
                    attributes: ['nombre', 'apellido'], 
                },
                {
                    model: Detalles,
                }
            ]
        });
        res.json(fichas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener los fichas.' });
    }
};
