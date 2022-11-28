const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');
const { userInfo } = require('os');
const { nextTick } = require('process');
const { debug } = require('console');
const { isLoggedIn } = require('../lib/auth');


//----------------------------------------Se usara formato json----------------------------------------//
router.use(express.urlencoded());

//----------------------------------------views----------------------------------------//


router.get('/create', isLoggedIn , async(req,res)=> {
    const articulo =await conexion.query('SELECT a.id_articulo, a.nombre_articulo, c.nombre, a.cantidad, a.punto_reposicion, s.nombre_sector FROM articulo a JOIN categoria c ON a.categoria_articulo = c.id_categoria JOIN sector s ON a.sector = s.id_sector WHERE estado=0'
    );
 
    res.render('contable/carga',{articulo: articulo});
   
});
/* revisar por que no redirecciona */
router.post('/create/articulo', isLoggedIn , async(req,res)=>{
    

    
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

router.get('/inicio', isLoggedIn, async(req,res)=>{
    switch(req.user.rol){
      case 1:
      res.render('inicio/inicio');
      break;
      case 2:
      res.render('inicio/inicioContable');
      break;
      case 3:
      res.render('inicio/inicioDefensor');
      break;
      case 4:
      res.render('inicio/inicioEmpleado');
      break;
      case 5:
      res.render('inicio/inicioResponsable');
      break;
      default:
      res.redirect('back');
      break;
  }

});

/* poner roles */
router.get('/stock', isLoggedIn , async(req,res)=>{
    const articulo =await conexion.query('SELECT a.id_articulo, a.nombre_articulo, c.nombre, a.cantidad, a.punto_reposicion, s.nombre_sector FROM articulo a JOIN categoria c ON a.categoria_articulo = c.id_categoria JOIN sector s ON a.sector = s.id_sector WHERE estado=0'
    );

    switch(req.user.rol){
        case 2:
            res.render('contable/stock',{articulo: articulo});
        break;

        case 3:
            res.render('defensor/stock',{articulo: articulo});
        break;
    }
   

})


//----------------------------------------Metodo insertar----------------------------------------//

router.get('/reposicion', isLoggedIn , async(req,res)=>{
    const articulo =await conexion.query('SELECT * FROM articulo WHERE estado=0'
    );

    res.render('contable/reposicion', {articulo: articulo});
});

router.post('/reposicion', isLoggedIn , async(req,res)=>{

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

router.get('/edit/articulo', isLoggedIn , async(req,res)=>{
    if (req.user.rol == 1){
    const articulo =await conexion.query('SELECT a.id_articulo, a.nombre_articulo, c.nombre, c.id_categoria, a.cantidad, a.punto_reposicion, s.id_sector, s.nombre_sector FROM articulo a JOIN categoria c ON a.categoria_articulo = c.id_categoria JOIN sector s ON a.sector = s.id_sector WHERE estado = 0'
    );
    
    res.render('admin/articuloEdit', {articulo: articulo});
    }else{
        res.redirect('back');
    }
});


router.post('/edit/articulo', isLoggedIn , async(req,res)=>{
    let id=req.body.idArticulo;
    let nombre=req.body.nombre;
    let categoria=req.body.categoria;
    let cantidad=req.body.cantidad;
    let sector=req.body.sector;
    let reposicion=req.body.repo;
    let sql= "UPDATE articulo SET nombre_articulo= ?, categoria_articulo=?, cantidad=?, sector= ?, punto_reposicion=? WHERE id_articulo=?"

    await conexion.query(sql,[nombre,categoria,cantidad,sector,reposicion,id],function(err,results){
        if(err){
            throw err;
        }else{
            res.redirect('/edit/articulo')

        }
    });
});

router.post('/del/articulo', isLoggedIn , async(req,res)=>{

    
    if (req.user.rol == 1){
    let id = req.body.id;

    await conexion.query('UPDATE articulo SET estado = 1 WHERE id_articulo ='+id);

    (err,results)=>{
        if(err){
            
            throw err;
        }};
    
        res.redirect('back');
    }else{
        res.redirect('back');
    }
});


router.get('/pedido', isLoggedIn , async(req,res)=>{
        let area= req.user.area;
        let pedido=await conexion.query('SELECT p.fecha_peticion fecha , u.nombre, u.apellido, e.nombre_estado estado, a.nombre_articulo articulo FROM peticion_articulo pa JOIN peticion p ON pa.id_peticion = p.id_peticion JOIN usuario u ON p.username = u.username JOIN articulo a ON pa.id_articulo = a.id_articulo JOIN estado e ON pa.estado= e.id_estado WHERE u.area=' + area);
    (err,results)=>{
        if(err){
            
            throw err;
        }else{
            
        }

    };
    switch(req.user.rol){
            
        case 1:
            res.render('admin/pedido',{pedido: pedido});
        break;

        case 2:
            res.render('contable/pedido',{pedido: pedido});
        break;

        case 3:
            res.render('defensor/pedido',{pedido: pedido});
        break;

        case 4:
            res.render('empleado/pedido',{pedido: pedido});
        break;

        case 5:
            res.render('responsable/pedido',{pedido: pedido});
        break;
    }
/* 
    SELECT p.fecha_peticion fecha , u.nombre, u.apellido, pa.estado, a.nombre_articulo articulo FROM peticion_articulo pa JOIN peticion p ON pa.id_peticion = p.id_peticion JOIN usuario u ON p.username = u.username JOIN articulo a ON pa.id_articulo = a.id_articulo WHERE u.area = 1; */  
});


router.get('/pedidoUsuario', isLoggedIn , async(req,res)=>{
        const articulo =await conexion.query('SELECT * FROM articulo'
        );

        switch(req.user.rol){
            
            case 1:
                res.render('admin/pedidoUsuario',{articulo: articulo});
            break;
    
            case 2:
                res.render('contable/pedidoUsuario',{articulo: articulo});
            break;
    
            case 3:
                res.render('defensor/pedidoUsuario',{articulo: articulo});
            break;
    
            case 4:
                res.render('empleado/pedidoUsuario',{articulo: articulo});
            break;
    
            case 5:
                res.render('responsable/pedidoUsuario',{articulo: articulo});
            break;
        }
       
    });

router.post('/pedidoUsuario', isLoggedIn , async (req,res)=>{
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

    router.get('/usuario', isLoggedIn , async(req,res)=>{
        const usuario =await conexion.query('SELECT u.rol, u.id_usuario, u.username, u.nombre AS nombreUsuario, u.apellido, a.id_area AS area, a.nombre AS nombreArea, a.id_area FROM usuario u JOIN area a ON u.area = a.id_area WHERE estado_usuario = 0'
        );
       if (req.user.rol == 1){

           res.render('admin/usuario',{usuario: usuario});
       }else{
        res.redirect('back');
       }
    });




    router.get('/historial/carga', isLoggedIn , async (req,res)=>{
        let rol = req.user.rol;
        const historial =await conexion.query('SELECT a.nombre_articulo, h.stock_inicial, h.modificacion, h.stock_final, u.nombre, u.apellido, h.fecha FROM historial h JOIN usuario u ON h.username = u.username JOIN articulo a ON h.id_articulo= a.id_articulo');
        switch (rol){
            case 1 :
            res.render('admin/historialcarga', {historial: historial});
            break
            case 2 :
            res.render('contable/historialcarga', {historial: historial});
            break
            case 3 :
            res.render('defensor/historialcarga', {historial: historial});
            break
        }
        
/*         if (rol != 5 || rol!= 4){
            const historial =await conexion.query('SELECT a.nombre_articulo, h.stock_inicial, h.modificacion, h.stock_final, u.nombre, u.apellido, h.fecha FROM historial h JOIN usuario u ON h.username = u.username JOIN articulo a ON h.id_articulo= a.id_articulo');
            res.render('historialcarga', {historial: historial});
        }else{
            const historial =await conexion.query('SELECT a.nombre_articulo, h.stock_inicial, h.modificacion, h.stock_final, u.nombre, u.apellido, h.fecha FROM historial h JOIN usuario u ON h.username = u.username JOIN articulo a ON h.id_articulo= a.id_articulo WHERE u.area='+ req.user.area);
            res.render('historialcarga', {historial: historial});
        } */

    });
module.exports = router;
