const jwt = require("jsonwebtoken");

module.exports = {
    authenticate: function (req, res, next) {
        var token = req.headers.authorization.split(' ')[1]; //Access token

        jwt.verify(token, "access", (err, user) => {
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
}