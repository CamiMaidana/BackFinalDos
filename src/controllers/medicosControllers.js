import { Medicos } from "../models/models.js";
import bcrypt from "bcrypt";

// Obtener todos los médicos
export const getMedicos = async (req, res) => {
    try {
        console.log('Obteniendo todos los médicos...');
        const medicos = await Medicos.findAll();
        console.log('Médicos obtenidos correctamente.');
        res.json(medicos);
    } catch (error) {
        console.log('Ha ocurrido un error al obtener los médicos:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener los médicos.' });
    }
};

// Obtener un médico por su ID
export const getMedicoById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Obteniendo médico con ID: ${id}...`);
        const medico = await Medicos.findByPk(id);
        if (medico) {
            console.log('Médico encontrado:', medico);
            res.json(medico);
        } else {
            console.log('No se encontró ningún médico con el ID proporcionado.');
            res.status(404).json({ error: 'No se encontró ningún médico con el ID proporcionado.' });
        }
    } catch (error) {
        console.log('Ha ocurrido un error al obtener el médico:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener el médico.' });
    }
};

// Crear un nuevo médico
export const postMedico = async (req, res) => {
    const { nombre, apellido, cedula, email, telefono, fecha_nacimiento, especialidad, username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        console.log('Creando nuevo médico...');
        const medico = await Medicos.create({
            nombre,
            apellido,
            cedula,
            email,
            telefono,
            fecha_nacimiento,
            especialidad,
            username,
            password: hashedPassword
        });
        console.log('Médico creado exitosamente:', medico);
        res.json(medico);
    } catch (error) {
        console.log('Ha ocurrido un error al crear el médico:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al crear el médico.' });
    }
};


// Actualizar un médico
export const putMedico = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, email, telefono, fecha_nacimiento, especialidad, username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        console.log(`Actualizando médico con ID: ${id}...`);
        const medico = await Medicos.findByPk(id);
        if (medico) {
            await medico.update({
                nombre,
                apellido,
                cedula,
                email,
                telefono,
                fecha_nacimiento,
                especialidad,
                username,
                password: hashedPassword
            });
            console.log('Médico actualizado:', medico);
            res.json(medico);
        } else {
            console.log('No se encontró ningún médico con el ID proporcionado.');
            res.status(404).json({ error: 'No se encontró ningún médico con el ID proporcionado.' });
        }
    } catch (error) {
        console.log('Ha ocurrido un error al actualizar el médico:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el médico.' });
    }
};

// Eliminar un médico
export const deleteMedico = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Eliminando médico con ID: ${id}...`);
        const medico = await Medicos.findByPk(id);
        if (medico) {
            await medico.destroy();
            console.log('Médico eliminado exitosamente.');
            res.json({ message: 'Médico eliminado exitosamente.' });
        } else {
            console.log('No se encontró ningún médico con el ID proporcionado.');
            res.status(404).json({ error: 'No se encontró ningún médico con el ID proporcionado.' });
        }
    } catch (error) {
        console.log('Ha ocurrido un error al eliminar el médico:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al eliminar el médico.' });
    }
};
