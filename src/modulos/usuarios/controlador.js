const auth = require('../auth');

const TABLA = 'usuarios';

module.exports=  function(dbinyectada) {
let db = dbinyectada;
if(!db){
    db = require ('../../DB/mysql');
}

    function listado(){
        return db.listado(TABLA);
    }
    
    function empleado(id){
        return db.empleado(TABLA, id);
    }
    
    
     async function agregar(body){
        const usuario ={

            id:body.id,
            nombre: body.nombre,
            apellido:body.apellido,
            tipo_usuario: body.tipo_usuario

        }

        const respuestas = db.agregar(TABLA, usuario);
        var insertId = 0;
        if(body == 0){
            insertId = respuestas.insertId;
        }else{
            insertId = body.id;

        }
        var respuesta2 = '';
        if(body.usuario || body.password){
          respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password

            })

        }


        return  respuesta2;
    }
    
    function eliminar(body){
        return db.eliminar(TABLA, body);
    }
    return{
    listado,
    empleado,
    agregar,
    eliminar   
    
    }
    
   
}