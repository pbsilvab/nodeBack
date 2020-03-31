const express = require('express');

//const secure    = require('./secure');
const response   = require('../network/response');
const store = require('../store/mysql');

const router = express.Router();

router.get('/:table',         list  );
router.get('/:table/:id',     get   );
router.post('/:table',        upsert);
router.put('/:table',         upsert);

async function list(req, res, next){
    const resp = await store.list(req.params.table);
    response.sucsess(req, res, resp, 200);
}

async function get(req, res, next){
    const resp = await store.list(req.params.table, req.params.id);
    response.sucsess(req, res, resp, 200);
}

async function upsert(req, res, next){
    const resp = await store.list(req.params.table, req.body);
    response.sucsess(req, res, resp, 200);
}

module.exports = router;