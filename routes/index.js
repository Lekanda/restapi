const express = require('express');
router = express.Router();
const clienteController = require('../controllers/clienteController');




module.exports = function () {
    
    //
    router.post('/clientes', 
        clienteController.nuevoCliente
    );
    
    // Obtener todos los clientes
    router.get('/clientes',
        clienteController.mostrarClientes
    );

    // Obtener un Cliente especifico x ID
    router.get('/clientes/:id', clienteController.mostrarCliente);

    return router;
};