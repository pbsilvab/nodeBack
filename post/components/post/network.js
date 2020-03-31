const express = require('express');

//const secure    = require('./secure');
const response  = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/',         list);

function list(req, res, next){
    Controller.list()
    .then((resp)=>{
        response.sucsess(req, res, resp, 200);
    })
    .catch(next);
}

module.exports = router;