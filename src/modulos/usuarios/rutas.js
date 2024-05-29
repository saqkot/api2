const express = require('express');
const respuestas= require('../../red/respuestas');
const controlador = require ('./index');


const router = express.Router();


router.get('/',listado);
router.get('/:id',empleado);
router.post('/',agregar);
router.put('/',eliminar);
router.put('/:id', editar);




async function listado(req, res){
    try{
        const items = await controlador.listado();
        respuestas.success(req, res, items,200);
   }catch(err){
       respuestas.error(req, res, err, 500);


   }

}; 


async function empleado(req, res){
    try{
         const items = await controlador.empleado(req.params.id);
     respuestas.success(req, res, items,200);
    }catch(err){
        respuestas.error(req, res, err, 500);


    }
   
    }; 

    async function agregar(req, res){
        try{
         const items = await controlador.agregar(req.body);
         if(req.body == 0){
            mensaje = 'item guardado con exito';
         }else{
            mensaje = 'item actualizado con exito';
         }
         respuestas.success(req, res, mensaje,201);
        }catch(err){
         respuestas.error(req, res, err, 500);
    
    
        }
       
        }; 
    





async function eliminar(req, res){
        try{
         const items = await controlador.eliminar(req.body);
         respuestas.success(req, res, 'item eliminado',200);
        }catch(err){
         respuestas.error(req, res, err, 500);
    
    
        }

        }; 
    


async function editar(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const result = await controlador.editar(id, body);
        respuestas.success(req, res, 'Usuario actualizado con éxito', 200);
    } catch (err) {
        respuestas.error(req, res, err, 500);
    }
};




   

module.exports = router;
