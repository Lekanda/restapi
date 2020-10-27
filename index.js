const express = require('express');
const routes = require('./routes');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// CORS permite que un cliente se conecte a otro servidor para el intercambio de de recursos
const cors = require('cors');




// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
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


// Habilitar CORS
app.use(cors());

// Rutas de la App
app.use('/', routes());

// Carpeta publica
app.use( express.static( 'uploads' ) );

// Puerto
app.listen(2000);