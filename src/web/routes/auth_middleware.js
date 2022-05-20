const jwt = require("jsonwebtoken");
require("dotenv").config();


class auth {
    constructor() { }
    strict(req, res, next) {
        if (!req.cookies.access_token) {
            res.redirect("/login");
            return;
        }
        const token = req.cookies.access_token;
        try {
            const decoded = jwt.verify(token, process.env.USER_AUTH_SECRET_KEY);
            req.user_auth = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    }
    passthrough(req, res, next) {
        const token = req.cookies.access_token;
        if (!token) {
            req.user_auth = null;
        }
        try {
            const decoded = jwt.verify(token, process.env.USER_AUTH_SECRET_KEY);
            req.user_auth = decoded;
        } catch (err) {
            req.user_auth = null;
        }
        return next();
    }
}

module.exports = auth;