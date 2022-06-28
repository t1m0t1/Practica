const express= require('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');

/* router.get('', (req,res)=>{

});
 */
router.get('/login', (req,res)=>{
    res.render('autenticacion/login')
});

router.post('/login', (req,res)=>{
    console.log(req.body);
    res.send('res');
});

module.exports = router;

