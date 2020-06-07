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

// Mostrar los Clientes
exports.mostrarClientes = async (req,res,next) => {

    try {
        const clientes = await Clientes.find({});
        res.json({mensaje:'Lista de Clientes', clientes});
    } catch (error) {
        console.log(error);
        next();
    }
}


// Mostrar un Cliente por Id
exports.mostrarCliente = async (req,res,next) => {
        try {
            const cliente = await Clientes.findById(req.params.id);
            res.json(cliente);
        } catch (error) {
            res.json({ mensaje:'No existe ese cliente'});
            console.log(error);
            next();
        }
}

// Actualizar un Cliente por Id
exports.actualizarCliente = async (req,res,next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.id }, 
            req.body, {
                new : true
            });
        res.json(cliente);
    } catch (error) {
        res.json({ mensaje:'No existe ese cliente'});
        console.log(error);
        next();
    }
}
