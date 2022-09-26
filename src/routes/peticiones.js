const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');

router.post("", async(req, res)=>{});

router.get("/pedido/aut", async(req, res)=>{
    res.render("autorizacion");
});

module.exports = router;