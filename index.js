import express from 'express';
import { sequelize } from './src/models/models.js';
import routerMedicos from './src/routes/routerMedicos.js';
import { login } from './src/controllers/loginController.js';
import authenticateToken from './src/middlewares/loginMiddleware.js'
import cors from 'cors';

const app = express();
await sequelize.sync();

//Habilitar frontend
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

const port = 3000;
//Configurar el servidor para que pueda recibir JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola');
})

app.post('/Login', login);

app.use('/Medicos', authenticateToken, routerMedicos);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
