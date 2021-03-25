require('dotenv').config();
const { verifyEmployeesByEmail } = require('./employees.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
    verifyEmployeeByEmail: (req, res) => {
        const body = req.body.user;
        verifyEmployeesByEmail(body.email, (err, results) => {
            if (err) {
                console.log("Error Login");
            }
            if (!results) {
                return res.status(200).json({ message: "unsuccess", accessToken: 'USER_NOT_AUTHENTICATED', refreshToken: 'USER_NOT_AUTHENTICATED' });
            }
            // const result = compareSync(body.password, results.password);
            if (results) {
                let accessToken = jwt.sign(body, "access", { expiresIn: "1h" });
                let refreshToken = jwt.sign(body, "refresh", { expiresIn: "7d" });

                // refreshTokens.push(refreshToken);

                return res.status(201).json({
                    message: 'success',
                    accessToken,
                    refreshToken
                });
            } else {
                return res.status(200).json({ message: "unsuccess", accessToken: 'USER_NOT_AUTHENTICATED', refreshToken: 'USER_NOT_AUTHENTICATED' });
            }
        });
    }
}