const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');
router.use(express.urlencoded());

router.post("/usuario/delete", async(req, res)=>{
    let id= req.body.id_usuario;
    await conexion.query("UPDATE usuario SET estado_usuario =0 WHERE id_usuario="+id);
    (err,results)=>{
                            
        if(err){
            console.log(err)
            throw err;
        }else{
            
        }}
    
    console.log(id);
    res.redirect("back")
});

router.post("/usuario/edit", async(req, res)=>{

});

module.exports = router;