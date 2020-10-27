const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req,res) => {
    // Leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje : 'Usuario nuevo guardado'});
    } catch (error) {
        console.log(error);  
        res.json({mensaje : 'Hubo un error'});
    }
}

exports.autenticarUsuario = () => {

    
}