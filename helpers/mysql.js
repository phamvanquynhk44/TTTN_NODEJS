const e = require('express');
var mysql = require('mysql');

//console.log('Get connection ...');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node-tttn'
});

const select = function(query){
    return new Promise((resolve, reject) => {
        pool.query(query, function(err, rows, fields){
            if (err){
                reject(err);
            }
            resolve(rows);
        });
    });
}
            
module.exports = {
    select: select
} 

/*conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

