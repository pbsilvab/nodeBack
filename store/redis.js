const redis = require('redis');

const config = require('../config');

   

const client = redis.createClient({
    host:       config.redis.host,
    port:       config.redis.port,
    password:   config.redis.pass
});


client.on("error", function(error) {
    console.error(error);
});
 

function list(table) {
   // client.get(table, redis.print);
    return new Promise( (resolve, reject)=> {
        client.get(table, (err, data)=>{
            if (err) return reject(err);
            
            let resp = data || null;
            if (data) {
                resp = JSON.parse(data);
            }

            return resolve(resp);
        });
    });
}

function get(table, id) {

}

async function upsert(table, data) {

    let key = table;

    if (data && data.id) {
        key = key + '_' + data.id;
    }

    client.setex(key, 10, JSON.stringify(data));

    return true
}

module.exports = {
    list,
    get,
    upsert
}