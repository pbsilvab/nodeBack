const request  = require('request');

function createRemoteDB(host, port) {

    const URL = 'http://'+host +':'+port;

    function list(table) {
        return req('GET', table);
    }
    
    function get(table, id) {
        return req('GET', `${table}/${id}`);
    }

    function upsert(table, data) {
        
        if(data.id){
            return req('PUT', table, data);
        }
        
        return req('POST', table, data);
        
    }

    function query() {}


    function req(method, table, data) {
        let url = URL + '/' + table;
        body    = '';
        if(data){
            body = data;
        }

        return new Promise((resolve, reject) => {
            request({
                method,
                headers:{
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body)=>{

                if(err) {
                    console.log('error con la db remota', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);

                return resolve(resp);
            });
        });
    }


    return {
        list,
        get,
        upsert
    }
}


module.exports = createRemoteDB;