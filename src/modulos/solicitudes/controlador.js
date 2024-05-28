
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
    
    
    function agregar(body){
        return db.agregar(TABLA, body);
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