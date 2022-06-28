function MostrarOcultar(){
    let tabla = document.getElementById("dv-table");
    
    if(tabla.hidden){
        tabla.hidden = false;
    }else{
        tabla.hidden = true;
    }
}

/* crear funcion para cargar de 1 en 1 */
/* Crear funcion para poder agregar nueva linea de carga */ 

export function registro(){
    let nombre = document.getElementById("cargaNombre");
    let categoria = document.getElementById("cargaCategoria");
    let cantidad = document.getElementById("cargaCantidad");
    let reposicion = document.getElementById("reposicion");

    alert(nombre);

    //coneccion base de datos

    //limpiar
/*     nombre.value = "";
    categoria.value = -1;
    cantidad.value = '';
    puntoRepo = ''; */
}


