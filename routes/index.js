const express = require('express');
router = express.Router();




module.exports = function () {
    router.get('/', (req,res) => {
        res.send('inicio');
    });
    router.get('/nosotros',(req,res) => {
        res.send('Nosotros');
    })



    return router;
};