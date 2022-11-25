const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');
const { isLoggedIn } = require('../lib/auth');

router.post("", async(req, res)=>{});

router.get("/pedido/res", async(req, res)=>{
    if (req.user.rol == 5){
    let peticion = {};
    const area = req.user.area;
    console.log(area);
   if (area == 1){
    peticion = await conexion.query('SELECT a.id_articulo, a.nombre_articulo, a.cantidad AS stock, pa.cantidad, pa.id_peticion_articulo, p.fecha_peticion, p.estado, u.nombre , u.apellido, ar.nombre AS nombre_area, ar.id_area, p.id_peticion FROM peticion_articulo pa JOIN peticion p ON pa.id_peticion=p.id_peticion JOIN usuario u ON p.username = u.username JOIN articulo a ON a.id_articulo = pa.id_articulo JOIN area ar ON ar.id_area = u.area WHERE pa.estado=2 AND a.sector = 2');
   }else{
    if (area == 2){
        peticion = await conexion.query('SELECT a.id_articulo, a.nombre_articulo, a.cantidad AS stock, pa.cantidad, pa.id_peticion_articulo, p.fecha_peticion, p.estado, u.nombre , u.apellido, ar.nombre AS nombre_area, ar.id_area, p.id_peticion FROM peticion_articulo pa JOIN peticion p ON pa.id_peticion=p.id_peticion JOIN usuario u ON p.username = u.username JOIN articulo a ON a.id_articulo = pa.id_articulo JOIN area ar ON ar.id_area = u.area WHERE pa.estado=2 AND a.sector = 1');    
       }else{
        peticion = await conexion.query('SELECT a.id_articulo, a.nombre_articulo, a.cantidad AS stock, pa.cantidad, pa.id_peticion_articulo, p.fecha_peticion, p.estado, u.nombre , u.apellido, ar.nombre AS nombre_area, ar.id_area, p.id_peticion FROM peticion_articulo pa JOIN peticion p ON pa.id_peticion=p.id_peticion JOIN usuario u ON p.username = u.username JOIN articulo a ON a.id_articulo = pa.id_articulo JOIN area ar ON ar.id_area = u.area WHERE pa.estado=2 AND a.sector = 3');
       }

   }
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


    res.render("responsable/respuesta", {peticion:peticion, contable: contable, sistemas: sistemas, legales: legales, tramites: tramites,
        atencionAlPublico: atencionAlPublico, recursosHumanos:recursosHumanos, personalLimpieza:personalLimpieza,
        logistica:logistica, niniez:niniez, relacionesPublicas:relacionesPublicas, despacho:despacho});
    }else{
        res.redirect('back');
    }
});

router.post("/pedido/res", isLoggedIn , async(req, res)=>{
    let username= req.user.username;

    req.body.pedidos = JSON.parse(req.body.pedidos);
    let pedido = req.body.pedidos;

    for (let i=0;i< pedido.length; i++){
        let cantidad_actual= await conexion.query('SELECT cantidad FROM articulo WHERE id_articulo =' + pedido[i].id_articulo);
        const peticion_articulo =await conexion.query ("UPDATE peticion_articulo SET estado = 3 WHERE id_peticion_articulo = " + pedido[i].id_peticion_articulo);
        cantidad_actual=JSON.stringify(cantidad_actual)
        cantidad_actual=JSON.parse(cantidad_actual)


        const historial=await conexion.query ("INSERT historial (id_articulo ,stock_inicial ,modificacion, stock_final, username, tipo) VALUES ("+pedido[i].id_articulo +","  +cantidad_actual[0].cantidad + " ,"+pedido[i].cantidad+ " ,"+(cantidad_actual[0].cantidad - pedido[i].cantidad)+ " ,"+username+ ", 2);");
        
        const articulo =await conexion.query ("UPDATE articulo SET cantidad = cantidad -"+pedido[i].cantidad + " WHERE id_articulo = "+ pedido[i].id_articulo);
        (err,results)=>{
                            
            if(err){
                console.log(err)
                throw err;
            }else{
                
            }}
    }

    res.redirect('/pedido/res');

});

router.get("/pedido/aut", isLoggedIn , async(req, res)=>{
    if (req.user.rol == 2){

    
  
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

    res.render("contable/autorizacion", {peticion:peticion, contable: contable, sistemas: sistemas, legales: legales, tramites: tramites,
        atencionAlPublico: atencionAlPublico, recursosHumanos:recursosHumanos, personalLimpieza:personalLimpieza,
        logistica:logistica, niniez:niniez, relacionesPublicas:relacionesPublicas, despacho:despacho});
    }else{
        res.redirect('back');
    }
});

router.post("/pedido/aut", isLoggedIn , async(req, res)=>{
    req.body.pedidos = JSON.parse(req.body.pedidos);
    let pedido = req.body.pedidos;

    for (let i=0; i< pedido.length; i++){
        
        const actualizacion= await conexion.query('UPDATE peticion_articulo SET estado = ' + 2 +' , cantidad= ' + pedido[i].cantidad + ' ' + 'WHERE id_peticion_articulo =' + pedido[i].id)
    }

    res.redirect('/pedido/aut');
});

module.exports = router;