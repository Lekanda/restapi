const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    productos: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Pedidos', productosSchema);