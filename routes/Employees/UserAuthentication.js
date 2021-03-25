const router = require('express').Router();
const jwt = require("jsonwebtoken");
const connection = require('../../db/db.js');
let refreshTokens = [];

// Creates a new accessToken using the given refreshToken;
router.post("/refresh", (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.json({ message: 'unsuccess', data: "Refresh token not found, login again" });
    }

    // If the refresh token is valid, create a new accessToken and return it.
    jwt.verify(refreshToken, "refresh", (err, user) => {
        if (!err) {
            const accessToken = jwt.sign({ username: user.name }, "access", {
                expiresIn: "60s"
            });
            return res.json({ message: 'success', accessToken });
        } else {
            return res.json({
                message: 'unsuccess',
                data: "Invalid refresh token"
            });
        }
    });
});

// Middleware to authenticate user by verifying his/her jwt-token.
async function auth(req, res, next) {
    let token = req.headers["authorization"];
    console.log('token', token);
    token = token.split(" ")[1]; //Access token
    console.log('req.token', token);

    jwt.verify(token, "access", async (err, user) => {
        if (user) {
            req.user = user;
            next();
        } else if (err.message === "jwt expired") {
            return res.json({
                message: 'unsuccess',
                accessToken: 'ACCESS_TOKEN_EXPIRED',
                refreshToken: 'ACCESS_TOKEN_EXPIRED'
            });
        } else {
            console.log(err);
            return res
                .status(200)
                .json({
                    message: "unsuccess",
                    accessToken: 'USER_NOT_AUTHENTICATED',
                    refreshToken: 'USER_NOT_AUTHENTICATED'
                });
        }
    });
}

router.get("/syncdata", auth, (req, res) => {
    return res.json({ message: "success", data: "Protected content!" });
});

// Protected route, can only be accessed when user is logged-in
router.post("/protected", auth, (req, res) => {
    return res.json({ message: "success", data: "Protected content!" });
});

// Route to login user. (In this case, create an token);
router.post("/login", (req, res) => {
    const user = req.body.user;
    const { email } = req.body.user;
    console.log(email);
    connection.query('SELECT email FROM users WHERE email ="' + mysql.escape(email) + '"', function (err, result) {
        if (err) {
            return res.status(404).json({ message: "unsuccess", accessToken: 'USER_NOT_AUTHENTICATED', refreshToken: 'USER_NOT_AUTHENTICATED' });
        }
        //You will get an array. if no users found it will return.
        if (result[0].email.length > 0) {
            let accessToken = jwt.sign(user, "access", { expiresIn: "60s" });
            let refreshToken = jwt.sign(user, "refresh", { expiresIn: "7d" });
            // res.cookie('jwt',accessToken, { httpOnly: true, secure: true, maxAge: new Date().setTime(new Date().getTime() + 7*24*60*60*1000) })
            refreshTokens.push(refreshToken);

            return res.status(201).json({
                message: 'success',
                accessToken,
                refreshToken
            });
        }
    });
});

module.exports = router;
