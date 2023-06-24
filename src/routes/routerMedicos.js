import  express from "express";
import { getMedicos,getMedicoById,postMedico,putMedico,deleteMedico } from '../controllers/medicosControllers.js'

const routerMedicos = express.Router();

routerMedicos.get('/', getMedicos);

routerMedicos.get('/:id', getMedicoById);

routerMedicos.post('/', postMedico);

routerMedicos.put('/:id', putMedico);

routerMedicos.delete('/:id', deleteMedico);

export default routerMedicos;