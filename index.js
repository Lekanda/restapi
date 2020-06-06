const express = require('express');
const routes = require('./routes');
const mongoose= require('mongoose');



// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// Crear el servidor
const app = express();

// Rutas de la App
app.use('/', routes());

// Puerto
app.listen(2000);