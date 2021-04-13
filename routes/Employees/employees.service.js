const pool = require('../../db/db.js');

module.exports = {
    create: (data, callBack) => {
        let sql = `call sp_createEmployee('','${data.employeeid}','${data.firstname}','${data.lastname}','${data.employeepassword}','${data.phonenumber}','${data.email}','${data.gender}','${data.dob}','${data.empaddress}','${data.empcity}','${data.empstate}','${data.empzipcode}','${data.empcountry}','${data.employeeemail}','${data.employeeid}','${'0'}','${'0'}','${'0'}','${'0'}','${'0'}')`;
        pool.query(sql, true, (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
    updateRefreshToken: (data, callBack) => {
        let sql = 'UPDATE loggindetails SET refreshtoken = ? WHERE email = ?';
        pool.query(sql, [data.token, data.email], (err, results, fields) => {
            if (err) {
                console.log('updateta error--------->', err);
                return callBack(err);
            }
            return callBack(null, results[0]);
        });
    },
    verifyEmployeesByEmail: (email, callBack) => {
        let sql = 'SELECT * FROM authenticationdetails WHERE email = ?';
        pool.query(sql, [email], (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        });
    },
    verifyEmployeesRefreshToken: (token, callBack) => {
        let sql = 'SELECT (refreshtoken) FROM authenticationdetails';
        pool.query(sql, [token], (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        });
    }
};
