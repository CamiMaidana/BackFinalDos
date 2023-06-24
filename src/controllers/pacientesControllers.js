import { Pacientes } from "../models/models.js";

// Obtener todos los pacientes
export const getPacientes = async (req, res) => {
    try {
        const pacientes = await Pacientes.findAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al obtener los pacientes.' });
    }
};

// Obtener un paciente por su ID
export const getPacienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Pacientes.findByPk(id);
        if (paciente) {
            res.json(paciente);
        } else {
            res.status(404).json({ error: 'No se encontró ningún paciente con el ID proporcionado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al obtener el paciente.' });
    }
};

// Crear un nuevo paciente
export const postPaciente = async (req, res) => {
    const { nombre, apellido, cedula, email, telefono, fecha_nacimiento } = req.body;
    try {
        const paciente = await Pacientes.create({
            nombre,
            apellido,
            cedula,
            email,
            telefono,
            fecha_nacimiento,
        });
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al crear el paciente.' });
    }
};


// Actualizar un paciente
export const putPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, email, telefono, fecha_nacimiento } = req.body;
    try {
        const paciente = await Pacientes.findByPk(id);
        if (paciente) {
            await paciente.update({
                nombre,
                apellido,
                cedula,
                email,
                telefono,
                fecha_nacimiento,
            });
            res.json(paciente);
        } else {
            res.status(404).json({ error: 'No se encontró ningún paciente con el ID proporcionado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el paciente.' });
    }
};

// Eliminar un paciente
export const deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Pacientes.findByPk(id);
        if (paciente) {
            await paciente.destroy();
            res.json({ message: 'Paciente eliminado exitosamente.' });
        } else {
            res.status(404).json({ error: 'No se encontró ningún paciente con el ID proporcionado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al eliminar el paciente.' });
    }
};
