exports.success = function(req, res, mensaje, status){
    
    const statusCode = status || 200;
    const mensajeOK = mensaje || '';

    
    res.status(statusCode).send({
     error: false,
     status: statusCode,
     body:mensaje
        

    });
}

exports.error = function(req, res, mensaje, status){
    const statusCode = status || 500;
    const mensajeError = status || 'Error interno';
    
    res.status(status).send({
     error: true,
     status: status,
     body:mensaje
        

    });
}