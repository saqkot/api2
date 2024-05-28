const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');


const solicitud = require('./modulos/solicitudes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');


const app = express();
app.use(cors());
//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//esta sera nuestra configuracion
app.set('port', config.app.port)

//rutas de la api
app.use('/api/solicitudes', solicitud);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);


module.exports = app;
