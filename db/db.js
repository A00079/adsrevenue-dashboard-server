var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
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