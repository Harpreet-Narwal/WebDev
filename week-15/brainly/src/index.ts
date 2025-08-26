import express from 'express';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from 'zod';
import {contentModel, linkModel, userModel} from "./db"
import { db_url } from './config';
import { JWT_PASSWORD } from './config';
import { AuthInfoReq, userMiddleware } from './middleware';
import crypto from "crypto";


mongoose.connect(db_url)
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
        }, JWT_PASSWORD)
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

app.post("/api/v1/content", userMiddleware,async (req: AuthInfoReq, res) =>{
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    await contentModel.create({
        title,
        link,
        type,
        userId: req.userId,
        tags: []
    })

    return res.json({
        message: "content added"
    })
})

app.get("/api/v1/content", userMiddleware, async (req: AuthInfoReq, res) =>{
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content 
    })

})

app.delete("/api/v1/content", userMiddleware, async (req: AuthInfoReq, res) =>{
    const contentId = req.body.contentId;
    const userId = req.userId;
    await contentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    })
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        message: "Content deleted successfully",
        content
    })
})


app.post("/api/v1/brain/share", userMiddleware, async (req: AuthInfoReq, res) =>{
    try{
        const { share } = req.body;
        const userId = req.userId;
        
        if(share){
            let existing = await linkModel.findOne({userId});
            if(!existing){
                const hash = crypto.randomBytes(12).toString("hex");
                existing = await linkModel.create({
                    hash,
                    userId
                });
            }
            return res.json({
                link: `/api/v1/brain/${existing.hash}`
            })   
        }else{
            await linkModel.deleteOne({userId});
            return res.json({link: null});
        }

    }catch(e){
        res.status(500).json({message: "Error creating share link", error: e});
    }
})


app.get("/api/v1/brain/:shareLink", userMiddleware, async (req: AuthInfoReq, res) =>{
    try{
        const { shareLink } = req.params;

        const linkDoc = await linkModel.findOne({hash: shareLink});

        if(!linkDoc){
            return res.status(404).json({
                message: "Invalid link or sharing disabled"
            })
        }

        const user = await userModel.findById(linkDoc.userId);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const content = await contentModel.find({
            userId: user._id
        }).populate("tags").lean();

        const formattedContent = content.map(c =>({
            id: c._id,
            type: c.type,
            link: c.link,
            title: c.title,
            tags: c.tags.map((t: any) => t.title)
        }));

        res.json({
            username: user.username,
            content: formattedContent
        })
    }
    catch(e){
        res.status(500).json({
            message: "Error fetching shared brain", 
            error: e
        });
    }
})


app.listen(3000);