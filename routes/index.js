const express = require('express');
router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');




module.exports = function () {
    
//CLIENTES
    router.post('/clientes', clienteController.nuevoCliente );
    
    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes );

    // Obtener un Cliente especifico x ID
    router.get('/clientes/:id', clienteController.mostrarCliente);

    // Obtener un Cliente especifico x ID
    router.put('/clientes/:id', clienteController.actualizarCliente);

    // Eliminar un Cliente de la DB
    router.delete('/clientes/:id', clienteController.eliminarCliente);


// PRODUCTOS
    // Nuevo Producto
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto );
    
    // // Obtener todos los clientes
    // router.get('/productos', productosController.mostrarProductos);

    // // Obtener un Cliente especifico x ID
    // router.get('/productos/:id', productosController.mostrarProducto);

    // // Obtener un Cliente especifico x ID
    // router.put('/productos/:id', productosController.actualizarProducto);

    // // Eliminar un Cliente de la DB
    // router.delete('/productos/:id', productosController.eliminarProducto);







    return router;
};