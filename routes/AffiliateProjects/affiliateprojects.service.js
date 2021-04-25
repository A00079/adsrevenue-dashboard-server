const pool = require('../../db/db.js');

module.exports = {
    createProject: (data, callBack) => {
        var sql = "INSERT INTO projectdetails (id,empname,empemail,project_id,projectname,projectstatus,totalteammembers,createdon) VALUES (?,?,?,?,?,?,?,?)";
        pool.query(sql, ["", data.empname, data.empemail, data.project_id, data.projectname, data.projectstatus, data.totalteammembers, data.createdon], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
    createTeams: (data, callBack) => {
        let records = [];
        for (var i = 0; i < data.length; i++) {
            records.push(new Array("", data[i].affname, data[i].affemail, data[i].affcontact, data[i].affpassword, data[i].empname, data[i].empemail, data[i].project, "", "", "", ""));
        }
        console.log('data.data.projectteamdetails', records);
        var sql = "INSERT INTO emp_project_teams (id,affiliate_id,affname,affemail,affcontact,affpassword,empname,empemail,project,conversion,payout,totalamount,paymentstatus) VALUES ?";
        pool.query(sql, [records], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
    getProjects: (data, callBack) => {
        var sql = "SELECT * FROM projectdetails";
        pool.query(sql, [true], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
    getTeamMembers: (data, callBack) => {
        var sql = "SELECT affiliate_id,affname,affemail FROM emp_project_teams WHERE project_id = ? ";
        pool.query(sql, [data], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
    getSingleAffiliates: (data, callBack) => {
        var sql = "SELECT affiliate_id,affname,affemail,empname,project,conversion,payout,totalamount,paymentstatus FROM emp_project_teams WHERE affiliate_id = ? ";
        pool.query(sql, [data], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
    updateAffiliates: (data, callBack) => {
        var sql = `UPDATE emp_project_teams SET conversion = ${"'" + data.affconvertion + "'"}, payout = ${"'" + data.affpayout + "'"}, paymentstatus = ${"'" + data.affpaymentstatus + "'"}, totalamount = ${"'" + data.afftotalamount + "'"} WHERE affiliate_id = ${"'" + data.affiliate_id + "'"}`;
        pool.query(sql, [true], (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        });
    },
    verifyAffiliate: (data, callBack) => {
        let sql = 'SELECT * FROM emp_project_teams WHERE affemail = ? AND affpassword = ?';
        pool.query(sql, [data.email, data.password], (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        });
    },
    updateRefreshToken: (data, callBack) => {
        let loginTime = new Date().toLocaleTimeString();
        let loginDate = new Date().toLocaleDateString().replace(/\//g, '-');
        let sql = 'UPDATE emp_project_teams SET refreshtoken = ?, isloggedin = ?, loggedintime = ?, loggedindate = ? WHERE affemail = ?';
        pool.query(sql, [data.token, '1', loginTime, loginDate, data.email], (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        });
    }
};
