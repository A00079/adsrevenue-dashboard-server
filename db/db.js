var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-25111-0.cloudclusters.net',
    port: 25111,
    user: 'james',
    password: 'james12345',
    database: 'adsrevenue'
});

pool.getConnection((err) =>{
    if(err){
        console.log("Error Connecting to DB.",err);
    }else{
        console.log("Successfully Connected to DB.");
    }
});

module.exports = pool;