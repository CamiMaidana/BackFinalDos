import { Medicos } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = await Medicos.findOne({ where: { username } });
        // If user not found or password doesn't match, return an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '24h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error de login.' });
    }
};