const express= require('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');

router.get('/usuario/alta', (req,res)=>{
    res.render('user/usuarioAlta')
});

router.post('/usuario/alta', (req,res)=>{

});

router.get('/usuario/administracion', (req,res)=>{

});
router.post('/usuario/administracion', (req,res)=>{

});

module.exports = router;