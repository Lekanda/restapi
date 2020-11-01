const express = require('express');
const routes = require('./routes');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: 'variables.env'});

// CORS permite que un cliente se conecte a otro servidor para el intercambio de de recursos
const cors = require('cors');




// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// Crear el servidor
const app = express();

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));// Para leer texto plano

// Definir un dominio(s) para recibir las peticiones.Est se conoce tener el dominio en una lista blanca
const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2];
const corsOptions = {
    origin: (origin, callback) => {
        // console.log(origin);
        // Revisar si la peticionviene de un servidor que esta en la lista blanca(whitelist)
        const existe = whitelist.some( dominio => dominio === origin );
        if(existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}



// Habilitar CORS
app.use(cors(corsOptions));

// Rutas de la App
app.use('/', routes());

// Carpeta publica
app.use( express.static( 'uploads' ) );


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 2000;


// Puerto
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});