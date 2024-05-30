const express = require('express');
const respuestas= require('../../red/respuestas');
const controlador = require ('./index');


const router = express.Router();


router.get('/',listado);
router.get('/:id',empleado);
router.post('/',agregar);
router.delete('/:id',eliminar);
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

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        let mensaje = '';
        if (req.body.id == 0) {
            mensaje = 'Item guardado con éxito';
        } else {
            mensaje = 'Item actualizado con éxito';
        }
        respuestas.success(req, res, mensaje, 201);
    } catch (err) {
        respuestas.error(req, res, err, 500);
    }
}
    


async function eliminar(req, res) {
  try {
    const result = await controlador.eliminar(req.params.id); 
    respuestas.success(req, res, 'Usuario eliminado con éxito', 200); 
  } catch (err) {
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
