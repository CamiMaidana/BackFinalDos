import { Medicos } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Intento de inicio de sesión:', username);

    // Buscar el usuario por su nombre de usuario
    const user = await Medicos.findOne({ where: { username } });

    // Si el usuario no se encuentra o la contraseña no coincide, devolver un error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Credenciales inválidas para el usuario:', username);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log('Inicio de sesión exitoso para el usuario:', username);

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '24h' });

    res.json({ token, id: user.id, nombre: user.nombre });
  } catch (error) {
    console.error('Error en el proceso de inicio de sesión:', error);
    res.status(500).json({ error: 'Error de login.' });
  }
};
