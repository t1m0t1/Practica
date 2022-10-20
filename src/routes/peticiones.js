const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');

router.post("", async(req, res)=>{});

router.get("/pedido/res", async(req, res)=>{
    res.render("respuesta");
});

router.get("/pedido/aut", async(req, res)=>{
   const peticion = await conexion.query('SELECT a.nombre_articulo, a.cantidad AS stock, pa.cantidad, pa.id_peticion_articulo, p.fecha_peticion, p.estado, u.nombre , u.apellido, ar.nombre AS nombre_area, ar.id_area, p.id_peticion FROM peticion_articulo pa JOIN peticion p ON pa.id_peticion=p.id_peticion JOIN usuario u ON p.username = u.username JOIN articulo a ON a.id_articulo = pa.id_articulo JOIN area ar ON ar.id_area = u.area WHERE p.estado=1 AND pa.estado=1');


    const sistemas= [];
    const contable= [];
    const legales= [];
    const tramites= [];
    const atencionAlPublico= [];
    const recursosHumanos= [];
    const personalLimpieza= [];
    const logistica= [];
    const niniez= [];
    const relacionesPublicas= [];
    const despacho= [];


    for (let i=0; i< peticion.length; i++ ){
        if (peticion.estado = 1){

            switch (peticion[i].id_area){
                case 1: sistemas.push(peticion[i]); 
                break;
                case 2: contable.push(peticion[i]);
                break;
                case 3: legales.push(peticion[i]);
                break;
                case 4: tramites.push(peticion[i]);
                break;
                case 5: atencionAlPublico.push(peticion[i]);
                break;
                case 6: recursosHumanos.push(peticion[i]);
                break;
                case 7: personalLimpieza.push(peticion[i]);
                break;
                case 8: logistica.push(peticion[i]);
                break;
                case 9: niniez.push(peticion[i]);
                break;
                case 10: relacionesPublicas.push(peticion[i]);
                break;
                case 11: despacho.push(peticion[i]);
                break;
            }
        }
    }

    router.post("/pedido/aut", async(req, res)=>{

    });

    res.render("autorizacion", {peticion:peticion, contable: contable, sistemas: sistemas, legales: legales, tramites: tramites,
        atencionAlPublico: atencionAlPublico, recursosHumanos:recursosHumanos, personalLimpieza:personalLimpieza,
        logistica:logistica, niniez:niniez, relacionesPublicas:relacionesPublicas, despacho:despacho});
});

module.exports = router;