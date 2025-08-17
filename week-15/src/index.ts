import express from 'express';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { lowercase, z } from 'zod';
import {userModel} from "./db"
import dotenv from 'dotenv';

dotenv.config();
const db_url = process.env.MONGO_CONN_STRING as string;


// async function main(){
//     await mongoose.connect(db_url)
// }
mongoose.connect(db_url)

const JWT_SEC = "BrainlyProject"
const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res)=>{
    const requireBody = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(8).max(20)
                .refine(val => /[a-z]/.test(val), {
                    message:"Password must contain a lowercase character"
                })
                .refine(val => /[A-Z]/.test(val), {
                    message: "Password must contain at least one Uppercase character"
                })
                .refine(val => /\d/.test(val), {
                    message: "Must contain 1 digit"
                })
                .refine(val => /[^a-zA-Z0-9]/.test(val), {
                    message: "Password must contain at least one special character"
                })
    })

    const {success} = requireBody.safeParse(req.body);


    if(!success){
        res.json({
            message: "Incorrect Format"
        })
    }
    else{
        const username = req.body.username;
        const password = req.body.password;
        const newUser = await userModel.create({
            username: username,
            password: password
        })

        res.status(200).json({
            message: "user created ",
            newUser
        })
    }

})

app.post("/api/v1/signin",async(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await userModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SEC)
        res.status(200).json({
            message: "Successfully signed in",
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect credential"
        })
    }
}) 

app.post("/api/v1/content", (req, res) =>{

})

app.get("/api/v1/content", (req, res) =>{
    res.json({
        message: "Hi"
    })
})

app.delete("/api/v1/content", (req, res) =>{

})


app.post("/api/v1/brain/share", (req, res) =>{

})


app.get("/api/v1/brain/:shareLink", (req, res) =>{
    
})


app.listen(3000);