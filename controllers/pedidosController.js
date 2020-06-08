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