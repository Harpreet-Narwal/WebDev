require("dotenv").config();
const jwt = require("jsonwebtoken")
const JWT_PASS = process.env.JWT_PASS

function authMiddleware(req, res , next) {
    const token = req.headers.token;

    if(!token){
        return res.status(403).send({
            message: "You are not logged in"
        })
    }

    const decoded = jwt.verify(token, JWT_PASS)
    const userId = decoded.userId;

    if(!userId){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }
    req.userId = userId;
    next();
}

module.exports = {authMiddleware};