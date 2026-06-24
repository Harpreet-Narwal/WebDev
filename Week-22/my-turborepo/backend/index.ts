import express, { json, response, text } from "express";
import { prisma } from "./db";
import jwt from "jsonwebtoken";
import {promise, z} from "zod";
import bcrypt from "bcrypt";
import { CreateAvatarSchema } from "./types";
import { authMiddleware } from "./middleware"
import { GoogleGenAI } from "@google/genai"
import { generateImage } from "./image";
import  { uuid }  from "uuidv4";
import { generateVideo } from "./video";
import cors from "cors";


 

const JWT_SECRET = process.env.JWT_SECRET as string;
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const app = express();
app.use(express.json());
app.use(cors())
const SALT_ROUNDS = 10;


const signup_schema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(3).max(72),
})

const signin_schema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(3),
})

//AUTH:
app.post("/api/v1/signup",async (req, res) =>{

    const parsed = signup_schema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            message: "Invalid Input",
            errors: parsed.error.flatten().fieldErrors,
        })
    }

    const username = parsed.data.username;
    const password = parsed.data.password;

    try{
        const existingUser = await prisma.user.findUnique({
            where: {username}
        });
        

        if(existingUser){
            return res.status(409).json({
                message: "User already exists"
            })
        }
        
        const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashed_password
            }
        });


        return res.json({
            message:"User created",
            user: {id: user.id, username: user.username}
        })
    }catch(e){
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})



app.post("/api/v1/signin", async (req, res) =>{

    const parsed = signin_schema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            message: "Invalid Input"
        })
    }

    const {username, password} = parsed.data

    try{
        const user = await prisma.user.findFirst({
            where: {username}
        })

        if(!user){
            return res.status(404).json({message: "User doesn't exist"})
        }
        
        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET, {expiresIn: "1h"})

        return res.status(200).json({
            message: "Signed In",
            token
        });
    }
    catch(e){
        console.error(e)
        return res.status(500).json({message: "Something went wrong"});
    }
});


// AVATAR: 


app.post("/api/v1/avatar", async (req, res) =>{
    // const userId = req.userId;
    const {success, data} = CreateAvatarSchema.safeParse(req.body);
    
    if(!success){
        res.status(411).json({
            message: "Invalid"
        })
        return;
    }

    const leftProfileId = uuid();
    const rightProfileId = uuid();
    const frontProfileId = uuid();
    await Promise.all([
        generateImage("Create a side profile for the user for the left side. It should be a high quality portfolio shoot type photo", data.image ,`./assets/${leftProfileId}.png` ),
        generateImage("Create a side profile for the user for the right side. It should be a high quality portfolio shoot type photo", data.image ,`./assets/${rightProfileId}.png` ),
        generateImage("Create a front profile for the user. It should be a high quality portfolio shoot type photo", data.image ,`./assets/${frontProfileId}.png` )
    
    ])

    // put in s3 and then put in db

    res.json()
})
 

app.get("/api/v1/avatar/:avatarId", (req, res) =>{

})

app.get("/api/v1/avatars", (req, res) =>{
    
})

// VIDEOS:
app.post("/api/v1/video", async (req, res) =>{
    await generateVideo("The video opens with a medium, eye-level shot of a beautiful man with dark hair and warm brown eyes. She wears a magnificent, high-fashion flamingo dress with layers of pink and fuchsia feathers, complemented by whimsical pink, heart-shaped sunglasses. She walks with serene confidence through the crystal-clear, shallow turquoise water of a sun-drenched lagoon. The camera slowly pulls back to a medium-wide shot, revealing the breathtaking scene as the dress's long train glides and floats gracefully on the water's surface behind her. The cinematic, dreamlike atmosphere is enhanced by the vibrant colors of the dress against the serene, minimalist landscape, capturing a moment of pure elegance and high-fashion fantasy.", ["image_url"], "./output/video.mp4");
    res.json({});
})

app.get("/api/v1/video/:videoId", (req, res) =>{

})

app.get("/api/v1/videos", (req, res) =>{

})


// USER
app.get("/api/v1/me", (req, res) =>{

})

// Models
app.get("/api/v1/models", (req, res) =>{
    res.json({});
})




app.listen(3000, () =>{
    console.log("Server running on post: 3000")
});