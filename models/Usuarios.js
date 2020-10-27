const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true, // Poner en minusculas
        trim: true// quita espacios
    },
    nombre: {
        type: String, // Tipo de Dato
        required: 'Agrega tu nombre'
    },
    password: {
        type: String, // Tipo de Dato
        required: 'Agrega una contraseña'

    }
});

module.exports = mongoose.model('Usuarios', usuariosSchema);