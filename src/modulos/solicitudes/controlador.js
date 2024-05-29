
const TABLA = 'solicitudes';

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
        const solicitud = {
            id:body.id,
            nombre: body.nombre,
            apellido: body.apellido,
            DPI: body.DPI,
            NIT: body.NIT,
            genero: body.genero,
            telefono: body.telefono,
            ingreso_mensual: body.ingreso_mensual,
            profesion: body.profesion,
            direccion: body.direccion
        };

        const respuestas = db.agregar(TABLA, solicitud);
        
        return respuestas;
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
