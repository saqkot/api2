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
    



async function agregar(body) {
    const usuario = {
        id: body.id,
        nombre: body.nombre,
        apellido: body.apellido,
        tipo_usuario: body.tipo_usuario
    };

    const respuestas = await db.agregar(TABLA, usuario);
    console.log('Respuesta de db.agregar:', respuestas);

    let insertId = 0;
    if (body.id === 0) {
        insertId = respuestas.insertId;
    } else {
        insertId = body.id;
    }
    console.log('ID insertado:', insertId);

    let respuesta2 = '';
    if (body.usuario || body.password) {
        respuesta2 = await auth.agregar({
            id: insertId,
            usuario: body.usuario,
            password: body.password
        });
    }
    console.log('Respuesta de auth.agregar:', respuesta2);

    return respuesta2;
}




    
    
    
 function eliminar(id) {
  return db.eliminar(TABLA, id); 
}

function editar(id, body) {
        const usuario = {
            nombre: body.nombre,
            apellido: body.apellido,
            tipo_usuario: body.tipo_usuario
        }

        if (body.usuario || body.password) {
            return auth.editar({
                id: id,
                usuario: body.usuario,
                password: body.password
            }).then(() => db.editar(TABLA, id, usuario));
        } else {
            return db.editar(TABLA, id, usuario);
        }
    }

    
    return{
    listado,
    empleado,
    agregar,
    eliminar,   
    editar
    }
    
   
}
