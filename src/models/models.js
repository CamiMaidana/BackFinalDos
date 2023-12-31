import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";

let dbConfig = {};

// Leer el archivo de configuración de la base de datos
try {
    dbConfig = JSON.parse(fs.readFileSync("./db.json"));
} catch (err) {
    //Usar la configuracion default
    dbConfig = { dialect: "sqlite", storage: "./db.sqlite3" }
    console.error("Error al leer el archivo de configuración de la base de datos, usando la configuracion default");
}

export const sequelize = new Sequelize(dbConfig);

export const Medicos = sequelize.define("Medicos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    cedula: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
    },
    especialidad: {
        type: DataTypes.STRING,
    },
    //[tipo cadena, pueden almacenar como constantes: Pediatra, Dermatologo, Clinico, etc], 
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
})

export const Pacientes = sequelize.define("Pacientes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    cedula: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
    },
})

export const Fichas = sequelize.define("Fichas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idmedico: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Medicos',
            key: 'id',
        }
    },
    fecha: {
        type: DataTypes.DATE,
    },
    idpaciente: {
        type: DataTypes.INTEGER,
        references:{
            model: 'Pacientes',
            key: 'id',
        }
    },
})

export const Detalles = sequelize.define("Detalles", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idfichas: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Fichas',
            key: 'id',
        }
    },
    motivo: {
        type: DataTypes.STRING,
    },
    diagnostico: {
        type: DataTypes.STRING,
    },
    tratamiento: {
        type: DataTypes.STRING,
    }
})

Fichas.belongsTo(Pacientes, { foreignKey: 'idpaciente' });
Fichas.belongsTo(Medicos, { foreignKey: 'idmedico' });
Fichas.hasMany(Detalles, { foreignKey: 'idfichas' });