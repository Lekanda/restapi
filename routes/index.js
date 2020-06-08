const express = require('express');
router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');




module.exports = function () {
    
//*********************CLIENTES*********************************
    router.post('/clientes', clienteController.nuevoCliente );
    
    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes );

    // Obtener un Cliente especifico x ID
    router.get('/clientes/:id', clienteController.mostrarCliente);

    // Obtener un Cliente especifico x ID
    router.put('/clientes/:id', clienteController.actualizarCliente);

    // Eliminar un Cliente de la DB
    router.delete('/clientes/:id', clienteController.eliminarCliente);


//***********************PRODUCTOS*****************************
    // Nuevo Producto
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto );
    // 
    // Obtener todos los Productos
    router.get('/productos', productosController.mostrarProductos);

    // Obtener un Producto especifico x ID
    router.get('/productos/:id', productosController.mostrarProducto);

    // Actualizar un producto especifico x ID
    router.put('/productos/:id', 
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar un Cliente de la DB
    router.delete('/productos/:id', productosController.eliminarProducto);



    
//************************PEDIDOS***************************

    // Nuevo Pedido
    router.post('/pedidos', pedidosController.nuevoPedido);




    return router;
};