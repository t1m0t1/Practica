const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');
const { userInfo } = require('os');
const { nextTick } = require('process');
const { debug } = require('console');


//----------------------------------------Se usara formato json----------------------------------------//
router.use(express.urlencoded());

//----------------------------------------views----------------------------------------//


router.get('/create', async(req,res)=> {
    const articulo =await conexion.query('SELECT a.id_articulo, a.nombre_articulo, c.nombre, a.cantidad, a.punto_reposicion, s.nombre_sector FROM articulo a JOIN categoria c ON a.categoria_articulo = c.id_categoria JOIN sector s ON a.sector = s.id_sector '
    );
 
    res.render('carga.hbs',{articulo: articulo});
   
});
/* revisar por que no redirecciona */
router.post('/create/articulo', async(req,res)=>{
    

    
    const sql= "INSERT INTO articulo SET ?"
    const data= {nombre_articulo:req.body.nombre,
        categoria_articulo:req.body.categoria,
        cantidad:req.body.cantidad,
        punto_reposicion:req.body.reposicion,
        sector: req.body.sector};


    await conexion.query(sql,data,function(err,results){
        if(err){
            throw err;
        }else{


        }
        res.redirect('/create');
    });

})



//SCRIPTS

//----------------------------------------Inicio (Mostrar articulos)----------------------------------------//

router.get('/inicio', async(req,res)=>{
    res.render('inicio');
});

router.get('/stock', async(req,res)=>{
    const articulo =await conexion.query('SELECT a.id_articulo, a.nombre_articulo, c.nombre, a.cantidad, a.punto_reposicion, s.nombre_sector FROM articulo a JOIN categoria c ON a.categoria_articulo = c.id_categoria JOIN sector s ON a.sector = s.id_sector '
    );
   
    res.render('stock',{articulo: articulo});
})


//----------------------------------------Metodo insertar----------------------------------------//

router.get('/reposicion', async(req,res)=>{
    const articulo =await conexion.query('SELECT * FROM articulo'
    );

    res.render('reposicion.hbs', {articulo: articulo});
});

router.post('/reposicion', async(req,res)=>{

        req.body.pedidos = JSON.parse(req.body.pedidos);

        let pedido = req.body.pedidos;
        /* traemos desde el body el nombre de usuario */
        let username= req.user.username;

        for (let i=0; i< pedido.length; i++){
        if (pedido[i].id != undefined){
                    console.log("exito");
                    /* traemos la cantidad actual del articulo */
                let cantidad_actual= await conexion.query('SELECT cantidad FROM articulo WHERE id_articulo =' + pedido[i].id);
                (err,results)=>{
                            
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        
                    }}
                    console.log(pedido[i].cantidad)
                    cantidad_actual=JSON.stringify(cantidad_actual)
                    cantidad_actual=JSON.parse(cantidad_actual)
                    

                /*Calcuular el stock final*/
                let stock_final = cantidad_actual[0].cantidad - pedido[i].cantidad;

                    /* Se insertan los valores a la tabla historal */
                await conexion.query('INSERT INTO historial (id_articulo,stock_inicial,modificacion,stock_final,username) VALUES ('
                + pedido[i].id +',' +cantidad_actual[0].cantidad+ ','+ pedido[i].cantidad + ','+ stock_final+ ','+ username +')');
                (err,results)=>{
                            
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        
                    }}
                    /* Se modifica el stock */
                await conexion.query('UPDATE articulo SET cantidad = cantidad +'+ pedido[i].cantidad +
                                            ' WHERE id_articulo =' + pedido[i].id);
                    
                (err,results)=>{
                            
            if(err){
                console.log(err)
                throw err;
            }else{
                
            }}
        }else{
            console.log("no salio");
            console.log(pedido[i]);
        }
        
        }

        res.redirect('reposicion');
        
    });





//----------------------------------------Metodo modificar----------------------------------------//
            /* Revisar */

router.put('/edit/articulo', async(req,res)=>{
    let id=req.params.id;
    let nombre=req.body.nombre;
    let categoria=req.body.categoria;
    let cantidad=req.body.cantidad;
    let reposicion=req.body.reposicion;
    let sql= "UPDATE articulo SET nombre_articulo= ?, categoria_articulo=?, cantidad=?, punto_reposicion=? WHERE id=?"

    await conexion.query(sql,[nombre,categoria,cantidad,reposicion,id],function(err,results){
        if(err){
            throw err;
        }else{
            res.send(results);

        }
    });
});

router.get('/pedido', async(req,res)=>{
        let area= req.user.area;
        let sql='SELECT * FROM peticion p JOIN usuario u ON p.username = u.id_usuario WHERE u.area =?';
    const pedido =await conexion.query(sql ,[area],function(err,results){
        if(err){
            
            throw err;
        }else{
            res.render('pedido',{pedido: results});

        }
    });
    

   
   
});


router.get('/pedidoUsuario', async(req,res)=>{
        const articulo =await conexion.query('SELECT * FROM articulo'
        );
       
        res.render('pedidoUsuario',{articulo: articulo});
    });

router.post('/pedidoUsuario', async (req,res)=>{
    req.body.pedidos = JSON.parse(req.body.pedidos);
    let pedido = req.body.pedidos;
    /* generar la peticion */
    let username= req.user.username;
    let peticion ='INSERT INTO peticion (username) VALUES (' + username + ')';
    /* traer peticion articulo */
    let id_peticion = 'SELECT id_peticion FROM peticion ORDER BY id_peticion DESC LIMIT 1';

    

    


    
    await conexion.query(peticion);
    (err,results)=>{
                
        if(err){
            console.log(err)
            throw err;
        }else{

        }
    }

    let auxiliar =await conexion.query(id_peticion);
    
    (err,results)=>{
                
        if(err){
            console.log(err)
            throw err;
        }else{

        }
    }
    auxiliar= JSON.stringify(auxiliar);
    auxiliar =JSON.parse(auxiliar)

    for (let i=0; i< pedido.length; i++){
            /* generar peticion articulo */

        let peticion_articulo= 'INSERT INTO peticion_articulo (id_peticion, id_articulo, cantidad) VALUES ('+ auxiliar[0].id_peticion +','+ pedido[i].id +','+ pedido[i].cantidad +')';
        await conexion.query(peticion_articulo);}
        (err,results)=>{
                
        if(err){
            console.log(err)
            throw err;
        }else{

        }
    }
    res.redirect('pedidoUsuario');


})

    router.get('/usuario', async(req,res)=>{
        const usuario =await conexion.query('SELECT u.id_usuario, u.username, u.nombre AS nombreUsuario, u.apellido, a.nombre FROM usuario u JOIN area a ON u.area = a.id_area'
        );
       
        res.render('user/usuario',{usuario: usuario});
    });
/* Error al cargar el logo de defensoria */
    router.get('/historial/carga', async (req,res)=>{
        let rol = req.user.rol;
        if (rol != 5 || rol!= 4){
            const historial =await conexion.query('SELECT a.nombre_articulo, h.stock_inicial, h.modificacion, h.stock_final, u.nombre, u.apellido, h.fecha FROM historial h JOIN usuario u ON h.username = u.username JOIN articulo a ON h.id_articulo= a.id_articulo');
            res.render('historialcarga', {historial: historial});
        }else{
            const historial =await conexion.query('SELECT a.nombre_articulo, h.stock_inicial, h.modificacion, h.stock_final, u.nombre, u.apellido, h.fecha FROM historial h JOIN usuario u ON h.username = u.username JOIN articulo a ON h.id_articulo= a.id_articulo WHERE u.area='+ req.user.area);
            res.render('historialcarga', {historial: historial});
        }

    });
module.exports = router;
