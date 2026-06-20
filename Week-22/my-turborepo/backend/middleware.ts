const jwt = require("jsonwebtoken");
import type { Request, Response, NextFunction } from "express";


const JWT_SECRET = process.env.JWT_SECRET as string;


interface AuthRequest extends Request {
    userId?: number;
}



export function authMiddleware(req:AuthRequest, res: Response, next: NextFunction){

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            message: "You are not logged in"
        })
    }

    
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(403).send({
            message: "You are not logged in"
        })
    }


    try{
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
    }catch(e){
        return res.status(403).json({
            message: "Invalid or expired token"
        })
    }
}

