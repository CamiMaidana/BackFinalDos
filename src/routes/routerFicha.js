import  express from "express";
import { crearFicha } from '../controllers/fichasControllers.js'

const routerFichas = express.Router();

routerFichas.post('/crear', crearFicha);

export default routerFichas;