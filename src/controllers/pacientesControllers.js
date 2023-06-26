import { Pacientes } from "../models/models.js";

// Obtener todos los pacientes
export const getPacientes = async (req, res) => {
    try {
        console.log('Obteniendo todos los pacientes...');
        const pacientes = await Pacientes.findAll({
            attributes: ['id', 'nombre', 'apellido']
        });
        console.log('Pacientes obtenidos correctamente.');
        res.json(pacientes);
    } catch (error) {
        console.log('Ha ocurrido un error al obtener los pacientes:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener los pacientes.' });
    }
};

// Obtener un paciente por su ID
export const getPacienteById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Obteniendo paciente con ID: ${id}...`);
        const paciente = await Pacientes.findByPk(id);
        if (paciente) {
            console.log('Paciente encontrado:', paciente);
            res.json(paciente);
        } else {
            console.log('No se encontró ningún paciente con el ID proporcionado.');
            res.status(404).json({ error: 'No se encontró ningún paciente con el ID proporcionado.' });
        }
    } catch (error) {
        console.log('Ha ocurrido un error al obtener el paciente:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener el paciente.' });
    }
};

// Crear un nuevo paciente
export const postPaciente = async (req, res) => {
    const { nombre, apellido, cedula, email, telefono, fecha_nacimiento } = req.body;
    try {
        console.log('Creando nuevo paciente...');
        const paciente = await Pacientes.create({
            nombre,
            apellido,
            cedula,
            email,
            telefono,
            fecha_nacimiento,
        });
        console.log('Paciente creado exitosamente:', paciente);
        res.json(paciente);
    } catch (error) {
        console.log('Ha ocurrido un error al crear el paciente:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al crear el paciente.' });
    }
};


// Actualizar un paciente
export const putPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, email, telefono, fecha_nacimiento } = req.body;
    try {
        console.log(`Actualizando paciente con ID: ${id}...`);
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
            console.log('Paciente actualizado:', paciente);
            res.json(paciente);
        } else {
            console.log('No se encontró ningún paciente con el ID proporcionado.');
            res.status(404).json({ error: 'No se encontró ningún paciente con el ID proporcionado.' });
        }
    } catch (error) {
        console.log('Ha ocurrido un error al actualizar el paciente:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el paciente.' });
    }
};

// Eliminar un paciente
export const deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Eliminando paciente con ID: ${id}...`);
        const paciente = await Pacientes.findByPk(id);
        if (paciente) {
            await paciente.destroy();
            console.log('Paciente eliminado exitosamente.');
            res.json({ message: 'Paciente eliminado exitosamente.' });
        } else {
            console.log('No se encontró ningún paciente con el ID proporcionado.');
            res.status(404).json({ error: 'No se encontró ningún paciente con el ID proporcionado.' });
        }
    } catch (error) {
        console.log('Ha ocurrido un error al eliminar el paciente:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al eliminar el paciente.' });
    }
};
