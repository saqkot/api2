const express = require('express');
const respuestas= require('../../red/respuestas');
const controlador = require ('./index');


const router = express.Router();


router.get('/',listado);
router.get('/:id',empleado);
router.post('/',agregar);
router.put('/:id', editar);
router.delete('/:id', eliminar);





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
}; 
    





async function editar(req, res) {
    try {
        const items = await controlador.editar(req.params.id, req.body);
        respuestas.success(req, res, 'Solicitud actualizada correctamente', 200);
    } catch (err) {
        respuestas.error(req, res, err, 500);
    }
};

async function eliminar(req, res) {
    try {
        const items = await controlador.eliminar(req.body);
        respuestas.success(req, res, 'Solicitud eliminada', 200);
    } catch (err) {
        respuestas.error(req, res, err, 500);
    }
};





   

module.exports = router;
