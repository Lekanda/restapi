const express = require('express');
const routes = require('./routes');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');



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


// Rutas de la App
app.use('/', routes());

// Puerto
app.listen(2000);