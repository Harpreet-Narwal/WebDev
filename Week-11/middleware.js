const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret123123"

function authMiddleware(req, res, next){
    const token = req.headers.token;

    if(!token){
        return res.status(403).send({
            message: "You are not logged in"
        })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const userId = parseInt(decoded.userId);

    if(!userId){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }
    req.userId = userId;
    console.log(userId);
    next();
}

module.exports ={
    authMiddleware
}