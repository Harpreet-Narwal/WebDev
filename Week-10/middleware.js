require("dotenv").config();
const JWT_PASS = process.env.JWT_PASS

function authMiddleware(req, res , next) {
    const token = req.header.token;

    if(!token){
        return res.status(403).send({
            message: "You are not logged in"
        })
    }

    const decoded = jwt.verify(token, JWT_PASS)
    const userId = decoded.userId;

    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }
    req.userId = userId;
    next();
}

module.exports = {authMiddleware};