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

exports.autenticarUsuario = async (req,res,next) => {
    // Buscar el usuario
    const {email, password} = req.body
    const usuario = await Usuarios.findOne({ email })
    if(!usuario) {
        // Sí no existe (401= No estas autorizado)
        await res.status(401).json({mensaje: 'Usuario no existe'});
        next();
    }else{
        // El usuario existe; Verificar si PASS es OK o NOK
        if(!bcrypt.compareSync(password, usuario.password)) {
            // Sí el password es incorrecto
            await res.status(401).json({ mensaje : 'La contraseña es incorrecta' });
            next();
        } else {
            // Sí el password es correcto, firmar el token
            const token = jwt.sign({
                email : usuario.email,
                nombre :usuario.nombre,
                _id : usuario._id

            }, 'LLAVESECRETA',
            {
                expiresIn : '1h'
            });

            // Retornar el Token
            res.json({ token });
        }
    }
}