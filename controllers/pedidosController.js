const Pedidos = require('../models/Pedidos');


exports.nuevoPedido = async(req,res,next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({mensaje:'Pedido guardado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los pedidos
exports.mostrarPedidos = async(req,res,next) => {
    try {
        const pedidos = await Pedidos.find({})
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar Pedido por Id
exports.mostrarPedido = async (req,res,next) => {
    try {
        const pedido = await Pedidos.findById(req.params.id)
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.json('No existe ese Pedido');
        next();
    }
}


// Actualizar un registro por ID
exports.actualizarPedido = async(req,res,next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({ _id : req.params.id }, 
            req.body, { new : true })
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });

        res.json(pedido);

    } catch (error) {
        res.json({ mensaje:'No existe ese Pedido'});
        console.log(error);
        next();
    }
}


// Eliminar pedido x ID
exports.eliminarPedido = async(req,res,next) => {
    try {
        const pedido = await Pedidos.findOneAndDelete({_id:req.params.id}).populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json({pedido, mensaje:'Pedido Eliminado'});
    } catch (error) {
        res.json({ mensaje:'No existe ese Pedido y no se elimino'});
        console.log(error);
        next();
    }
}