const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

    // Autorizacion por el header. En Axios es obligatorio mandar uun request con esa autorizacion.
    const authHeader = req.get('Authorization') ;
    // console.log(authHeader);


    if(!authHeader) {
        const error = new Error ('No Autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }
    
    // Obtener el Token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

     // El token es valido pero hay algun error
     if(!revisarToken) {
         const error = new Error('No autenticado');
         error.statusCode = 401;
         throw error     
    }

    // Toda la verificacion pasada
    next();


}