const express       = require('express');
const bodyParser    = require('body-parser');

const config        = require('../config.js');
const mysqlRoutes        = require('./network');

const app     = express(); 

app.use(bodyParser.json());

app.use('/', mysqlRoutes);

app.listen(config.mysql_service.port, ()=>{
    console.log('Servicio de mysql ', config.mysql_service.port);
});

