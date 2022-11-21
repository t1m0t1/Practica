const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');




router.post("/usuario/delete", async(req, res)=>{
    let id= req.body.id_usuario;
    await conexion.query("UPDATE usuario SET estado_usuario =1 WHERE id_usuario="+id);
    (err,results)=>{
                            
        if(err){
            console.log(err)
            throw err;
        }else{
            
        }}
    
    console.log(id);
    res.redirect("/usuario")
});

router.post("/usuario/edit", async(req, res)=>{

    let idUser= req.body.idusuario;
    let nombre= req.body.nombre;
    let apellido= req.body.apellido;
    let area= req.body.area;
    let rol= req.body.rol;


    await conexion.query("UPDATE `usuario` SET nombre= '" + nombre +  "', apellido= '" + apellido +  "' , area= "+area+", rol= "+rol+"  WHERE id_usuario = " + idUser + ";");
    (err,results)=>{
                            
        if(err){
            console.log(err)
            throw err;
        }else{
            
        }}
    
    
    res.redirect("/usuario")

});

module.exports = router;