const express = require('express');
router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');


// Middleware para proteger las rutas
const auth = require('../middleware/auth');



module.exports = function () {
    
//*********************CLIENTES*********************************
    router.post('/clientes', 
        auth,
        clienteController.nuevoCliente 
    );
    
    // Obtener todos los clientes
    router.get('/clientes', 
        auth,
        clienteController.mostrarClientes
    );

    // Obtener un Cliente especifico x ID
    router.get('/clientes/:id',
        auth, 
        clienteController.mostrarCliente
    );

    // Actualizar un Cliente especifico x ID
    router.put('/clientes/:id',
        auth, 
        clienteController.actualizarCliente
    );

    // Eliminar un Cliente de la DB
    router.delete('/clientes/:id',
        auth, 
        clienteController.eliminarCliente
    );



//***********************PRODUCTOS*****************************
    // Nuevo Producto
    router.post('/productos', 
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto );
    // 
    // Obtener todos los Productos
    router.get('/productos',
        auth, 
        productosController.mostrarProductos
    );

    // Obtener un Producto especifico x ID
    router.get('/productos/:id',
        auth,
        productosController.mostrarProducto
    );

    // Actualizar un producto especifico x ID
    router.put('/productos/:id',
        auth, 
        productosController.subirArchivo,
        productosController.actualizarProducto);

    // Eliminar un Producto de la DB
    router.delete('/productos/:id', 
        auth,
        productosController.eliminarProducto
    );

    // Busqueda de productos
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProducto
    );


    
//************************PEDIDOS***************************

    // Nuevo Pedido
    router.post('/pedidos/nuevo/:idUsuario', 
        auth,
        pedidosController.nuevoPedido
    );
    
    // Mostrar Pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos
    );
    
    // Mostrar pedido por ID
    router.get('/pedidos/:id',
        auth, 
        pedidosController.mostrarPedido
    );
    
    // Actualizar pedido x ID
    router.put('/pedidos/:id',
        auth, 
        pedidosController.actualizarPedido
    );
    
    // Eliminar x ID
    router.delete('/pedidos/:id',
        auth, 
        pedidosController.eliminarPedido
    );
/************************************************* */
//       USUARIOS

    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );
    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );





    return router;
};