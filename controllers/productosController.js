const Productos = require('../models/Productos');

exports.nuevoProducto = async(req,res,next) => {
    console.log(req.body);
    const producto = new Productos(req.body);

    try {
        await producto.save();
        res.json({ mensaje:'Nuevo producto creado' });
    } catch (error) {
        console.log(error);
        res.json({ mensaje:'No se creo el producto' });
        next();
    }
}