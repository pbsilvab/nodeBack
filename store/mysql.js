const mysql = require('mysql');

const config = require('../config');


const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

// connect!

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if(err) {
            console.error('[db error]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB CONNECTED');
        }
    });

    connection.on('error', err=>{
        console.error('[db error]', err);
        if(err.code == 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise ( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

function get(table, id) {
    return new Promise ( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

function insert(table, data) {
    return new Promise ( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}
function update(table, data) {
    return new Promise ( (resolve, reject) => {
        connection.query(`UPDATE ${table}  SET ? WHERE id = ?`,[data, data.id] , (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    }); 
}



function upsert(table, data) {

    if (data && data.id) {
        return update(table, data)
    } else {
        return insert(table, data)
    }

}

function query(table, q, join) {

    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} on ${table}.${val} = ${key}.id`;
    }

    return new Promise( (resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, q, (err, result)=>{
            if (err) {
                return reject(err);
            }
            result = JSON.stringify(result);
            result = JSON.parse(result);
            resolve( result[0] || null);
        });
    });
}

module.exports = {
    list,
    get,
    upsert,
    query
}