const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth');


module.exports=  function(dbinyectada) {
let db = dbinyectada;
if(!db){
    db = require ('../../DB/mysql');
}

 async function login(usuario,password){
    const data = await db.query(TABLA,{usuario: usuario});

    return bcrypt.compare(password, data.password)
    
    .then(resultado =>{
        if(resultado === true){
            return auth.asignarToken({...data})

        }else{
            throw new Error ('informacion invalida');


        }
    })
}
    
    
  async function agregar(data) {
        console.log('data', data);

        const authData = {
            id: data.id,
        };

        if (data.usuario) {
            authData.usuario = data.usuario;
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        return db.insertar(TABLA, authData);
    }
    
    return{
    
    agregar,
    login
     
    
    }
    
   
}
