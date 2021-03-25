const pool = require('../../db/db.js');

module.exports = {
    verifyEmployeesByEmail : (email, callBack) =>{
        let sql = 'SELECT * FROM authenticationdetails WHERE email = ?';
        pool.query(sql,[email],(err,results,fields) =>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results[0]);
        });
    },
    verifyEmployeesRefreshToken : (token, callBack) =>{
        let sql = 'SELECT (refreshtoken) FROM authenticationdetails';
        pool.query(sql,[token],(err,results,fields) =>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        });
    }
};
