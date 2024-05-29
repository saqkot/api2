const express = require('express');
const respuestas= require('../../red/respuestas');
const controlador = require ('./index');


const router = express.Router();


router.get('/',listado);
router.get('/:id',empleado);
router.post('/',agregar);
router.put('/',eliminar);




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


async function agregar(req, res) {
    try {
        const items = await controlador.agregar(req.body);
        respuestas.success(req, res, 'Solicitud agregada correctamente', 201);
    } catch (err) {
        respuestas.error(req, res, err, 500);
    }
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
    





   

module.exports = router;
