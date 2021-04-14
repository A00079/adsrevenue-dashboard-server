const pool = require('../../db/db.js');

module.exports = {
    create: (data, callBack) => {
        let sql = `call sp_createEmployee('','${data.employeeid}','${data.firstname}','${data.lastname}','${data.employeepassword}','${data.phonenumber}','${data.email}','${data.gender}','${data.dob}','${data.empaddress}','${data.empcity}','${data.empstate}','${data.empzipcode}','${data.empcountry}','${data.employeerole}','${data.employeeemail}','${data.employeeid}','${'0'}','${'0'}','${'0'}','${'0'}')`;
        pool.query(sql, true, (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
    updateRefreshToken: (data, callBack) => {
        let loginTime = new Date().toLocaleTimeString();
        let loginDate = new Date().toLocaleDateString().replace(/\//g, '-');
        let sql = 'UPDATE loggindetails SET refreshtoken = ?, isloggedin = ?, loggedintime = ?, loggedindate = ? WHERE email = ?';
        pool.query(sql, [data.token, '1', loginTime, loginDate, data.email], (err, results, fields) => {
            if (err) {
                console.log('updateta error--------->', err);
                return callBack(err);
            }
            return callBack(null, results);
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
