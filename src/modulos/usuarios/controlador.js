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
    // Crear el objeto usuario con los datos proporcionados en body
    const usuario = {
        id: body.id,
        nombre: body.nombre,
        apellido: body.apellido,
        tipo_usuario: body.tipo_usuario
    };

    // Insertar el usuario en la tabla y obtener la respuesta
    var respuestas = await db.agregar('usuarios', usuario);
    console.log('respuestas', respuestas);

    // Determinar el id insertado
    var insertId = 0;
    if (body.id == 0) { // Si el id en body es 0, usar el id generado automáticamente
        insertId = respuestas.insertId;
    } else { // Si el id está proporcionado en body, usarlo
        insertId = body.id;
    }

    // Insertar los datos de autenticación solo si usuario o password están presentes
    var respuesta2 = '';
    if (body.usuario || body.password) {
        respuesta2 = await auth.agregar({
            id: insertId, // Usar el id determinado anteriormente
            usuario: body.usuario,
            password: body.password
        });
    }

    return respuesta2; // Devolver la respuesta de la inserción en la tabla auth
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
