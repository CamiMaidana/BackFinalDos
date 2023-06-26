import  express from "express";
import { crearFicha, getFichas } from '../controllers/fichasControllers.js'

const routerFichas = express.Router();

routerFichas.post('/crear', crearFicha);

routerFichas.get('/get', getFichas);

export default routerFichas;

