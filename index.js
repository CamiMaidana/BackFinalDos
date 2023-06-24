import express from 'express';
import { sequelize } from './src/models/models.js';
import routerMedicos  from './src/routes/routerMedicos.js';



const app = express();
await sequelize.sync();

const port = 3000;
//Configurar el servidor para que pueda recibir JSON
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hola');
})

app.use('/Medicos', routerMedicos);


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
