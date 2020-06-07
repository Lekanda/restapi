const express = require('express');
router = express.Router();
const clienteController = require('../controllers/clienteController');




module.exports = function () {
    
    //
    router.post('/clientes', 
        clienteController.nuevoCliente
    );
    


    return router;
};