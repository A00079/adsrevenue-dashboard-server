var mysql = require('mysql');

var pool = mysql.createPool({
    multipleStatements: true,
	host: "103.108.220.91",
	user: "ssynvngg_jacky",
	password: "adsmedia@2021",
	database: "ssynvngg_adsmedia",
	port:3306
});

pool.getConnection((err) =>{
    if(err){
        console.log("Error Connecting to DB.",err);
    }else{
        console.log("Successfully Connected to DB.");
    }
});

module.exports = pool;

