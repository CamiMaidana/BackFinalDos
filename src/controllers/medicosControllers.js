import { Medicos } from "../models/models.js";
import bcrypt from "bcrypt";

// Obtener todos los médicos
export const getMedicos = async (req, res) => {
    try {
        const medicos = await Medicos.findAll();
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al obtener los médicos.' });
    }
};

// Obtener un médico por su ID
export const getMedicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const medico = await Medicos.findByPk(id);
        if (medico) {
            res.json(medico);
        } else {
            res.status(404).json({ error: 'No se encontró ningún médico con el ID proporcionado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al obtener el médico.' });
    }
};

// Crear un nuevo médico
export const postMedico = async (req, res) => {
    const { nombre, apellido, cedula, email, telefono, fecha_nacimiento, especialidad, username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const medico = await Medicos.create({
            nombre,
            apellido,
            cedula,
            email,
            telefono,
            fecha_nacimiento,
            especialidad,
            username,
            password:hashedPassword
        });
        res.json(medico);
    } catch (error) {
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
                password:hashedPassword
            });
            res.json(medico);
        } else {
            res.status(404).json({ error: 'No se encontró ningún médico con el ID proporcionado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el médico.' });
    }
};

// Eliminar un médico
export const deleteMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const medico = await Medicos.findByPk(id);
        if (medico) {
            await medico.destroy();
            res.json({ message: 'Médico eliminado exitosamente.' });
        } else {
            res.status(404).json({ error: 'No se encontró ningún médico con el ID proporcionado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al eliminar el médico.' });
    }
};
