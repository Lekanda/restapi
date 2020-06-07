const Clientes = require('../models/Clientes');


// Agrega un nuevo cliente
exports.nuevoCliente = async(req,res,next) => {
    // console.log(req.body);
    const cliente = new Clientes(req.body);
    console.log(cliente);
    
    try {
        // Almacenar el regitro
        await cliente.save();
        res.json({ mensaje: 'Se agrego a la DB' });
    } catch (error) {
        // Sí hay un error
        console.log(error);
        next();
    }
}