require('dotenv').config();
const { create, updateRefreshToken, verifyEmployeesByEmail } = require('./employees.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
    createEmployee: (req, res) => {
        var body = req.body.data;
        const salt = genSaltSync(10);
        body.employeepassword = hashSync(body.employeepassword, salt);
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                message: 'success',
                data: results
            });
        });
    },
    verifyEmployeeByEmail: (req, res) => {
        const body = req.body.user;
        let accessToken = jwt.sign(body, "access", { expiresIn: "1h" });
        let refreshToken = jwt.sign(body, "refresh", { expiresIn: "7d" });
        verifyEmployeesByEmail(body.email, (err, results) => {
            if (err) {
                console.log("Error Login");
            }
            if (!results) {
                return res.status(200).json({ 'message': "unsuccess", 'accessToken': 'USER_NOT_AUTHENTICATED', 'refreshToken': 'USER_NOT_AUTHENTICATED' });
            }
            const result = compareSync(body.password, results.emp_password);
            console.log('result', result);
            if (result) {
                let data = {
                    'token': refreshToken,
                    'email': body.email
                }
                updateRefreshToken(data, (tokenerr, tokenresults) => {
                    if (tokenerr) {
                        return res.status(201).json({
                            message: 'unsuccess',
                            data: 'Error updating token.'
                        });
                    }
                    if (!tokenresults) {
                        return res.status(201).json({
                            message: 'unsuccess',
                            data: tokenerr
                        });
                    }
                    if (tokenresults) {
                        return res.status(201).json({
                            message: 'success',
                            accessToken,
                            refreshToken
                        });
                    }
                })
            } else {
                return res.status(200).json({ message: "unsuccess", accessToken: 'USER_NOT_AUTHENTICATED', refreshToken: 'USER_NOT_AUTHENTICATED' });
            }
        });
    }
}