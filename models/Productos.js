const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre: {
        type: String, // Tipo de Dato
        trim: true, // Quita los espacios excesivos en el campo
        // unique:true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    }
});

module.exports = mongoose.model('Productos', productosSchema);