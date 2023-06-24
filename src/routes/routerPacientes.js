import  express from "express";
import { getPacientes,getPacienteById,postPaciente,putPaciente,deletePaciente } from '../controllers/pacientesControllers.js'

const routerPacientes = express.Router();

routerPacientes.get('/', getPacientes);

routerPacientes.get('/:id', getPacienteById);

routerPacientes.post('/', postPaciente);

routerPacientes.put('/:id', putPaciente);

routerPacientes.delete('/:id', deletePaciente);

export default routerPacientes;