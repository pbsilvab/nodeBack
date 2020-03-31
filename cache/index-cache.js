const express       = require('express');
const bodyParser    = require('body-parser');

const config        = require('../config.js');
const cacheRoutes        = require('./network');

const app     = express(); 

app.use(bodyParser.json());

app.use('/', cacheRoutes);

app.listen(config.cache_service.port, ()=>{
    console.log('Servicio de cache ', config.cache_service.port);
});

