function authMiddleware(req, res , next) {
    const token = req.header.token;

    if(!token){
        return res.status(403).send({
            message: "You are not logged in"
        })
    }

    const decoded = jwt.verify(token, jwtSecret)
    const username = decoded.username;

    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }
    req.username = username;
    next();
}

module.exports = {authMiddleware};