const mysql = require ('mysql');
const config = require('../config');

const dbconfig ={

host: config.mysql.host,
user: config.mysql.user,
password: config.mysql.password,
database: config.mysql.datebase,

}

let conexion;

function conmysql(){

    conexion = mysql.createConnection(dbconfig);


    conexion.connect((err)=>{

        if(err){
            console,log('[db err]',err);
            setTimeout(conmysql,200) ;
        }else{
            console.log('DB conectada')
        }
    });

    
    conexion.on('error', err => {
        console,log('[db err]',err);
         if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conmysql();
         }else{
            throw err;
         }

    })
}
conmysql();

function listado(table){
return  new Promise((resolve, reject) => {
    
    conexion.query(`SELECT * FROM ${table}`,(error,result)=>{

        if(error) return reject(error);
        resolve(result);
    })
});


}


function empleado(tabla, id){
    return  new Promise((resolve, reject) => {
    
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`,(error,result)=>{
    
            if(error) return reject(error);
            resolve(result);
        })
    });



}

function agregar(tabla, data){

    return  new Promise((resolve, reject) => {
    
        conexion.query(`INSERT INTO ${tabla} SET ?`,data,(error,result)=>{
    
            if(error) return reject(error);
            resolve(result);
        })
    });


}

function eliminar(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(`DELETE FROM ${tabla} WHERE id= ?`, id, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}


function query(tabla, consulta){

    return  new Promise((resolve, reject) => {
    
        conexion.query(`SELECT * FROM ${tabla} WHERE  ?`,consulta,(error,result)=>{
    
            if(error) return reject(error);
            resolve(result[0]);
        })
    });


}

function editar(tabla, id, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

module.exports = {
listado,
empleado,
agregar,
eliminar,
query,
editar

}
