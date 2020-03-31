const express = require('express');

const secure    = require('./secure');
const response  = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/',         list);
router.get('/find/:id',  find);
router.get('/following/:id',  following);

router.post('/follow/:id', secure('follow'), follow);
router.post('/',        upsert);

router.put('/',  secure('update')    ,   upsert);

function list(req, res, next) {
    Controller.list()
    .then((resp)=>{
        response.sucsess(req, res, resp, 200);
    })
    .catch(next); 
}

function find(req, res, next) {
    Controller.get(req.params.id)
    .then((resp)=>{
        response.sucsess(req, res, resp, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
    .then((resp)=>{
        response.sucsess(req, res, resp, 200);
    })
    .catch(next);
}

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
    .then(resp => {
        response.sucsess(req, res, resp, 200);
    })
    .catch(next);
}

function following(req, res, next){
    Controller.following(req.params.id)
    .then(resp => {
        response.sucsess(req, res, resp, 200);
    })
    .catch(next);
}
module.exports = router;