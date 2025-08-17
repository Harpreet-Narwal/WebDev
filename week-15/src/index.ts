import express from 'express';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { lowercase, z } from 'zod';




const app = express();

app.use(express.json());

app.post("/api/v1/signup", (req, res)=>{
    const requireBody = z.object({
        name: z.string().min(3).max(10),
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

    

})

app.post("/api/v1/signin", (req, res) =>{

}) 

app.post("/api/v1/content", (req, res) =>{

})

app.get("/api/v1/content", (req, res) =>{

})

app.delete("/api/v1/content", (req, res) =>{

})


app.post("/api/v1/brain/share", (req, res) =>{

})


app.get("/api/v1/brain/:shareLink", (req, res) =>{
    
})

app.listen(3000);