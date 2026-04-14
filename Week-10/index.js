require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");
const app = express();
const {userModel, organizationModel} = require("./models");
const { default: mongoose } = require("mongoose");

const JWT_PASS = process.env.JWT_PASS
const DB_CONNECT = process.env.DB_CONNECT


const jwtSecret = JWT_PASS
app.use(express.json());
mongoose.connect(DB_CONNECT)
    .then(() => console.log("DB Connected Successfully"))


// usernsme, password | USERS Table
// organization | ORGANIZATION Table
// boards | BOARDS Table
// Issues | ISSUES Table

let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;

// Examples:

const USERS = [];
const ORGANIZATIONS = [];
const BOARDS = [];
const ISSUES = [];

// CREATE
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // const userExists = USERS.find(u => u.username === username);
    const userExists = await userModel.findOne({
        username: username
    });


    if(userExists){
        res.status(411).json({
            message: "User with this username already exists"
        })
        return;
    }

    const newUser = await userModel.create({
        username: username,
        password: password
    })
    return res.status(200).json({
        id: newUser._id,
        message: "User Signed Up successfully"
    })


})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await userModel.findOne({
        username: username,
        password
    });
    
    if(!userExists){
        res.status(403).json({
            message: "Incorrect Credentials"
        })
        return
    }

    const token = jwt.sign({
        userId: userExists._id
    }, JWT_PASS);


    res.status(200).json({
        message: "User Signed In",
        jwt: token
    })

})

app.use(authMiddleware);

app.post("/organization",async(req, res) => {
    const userId = req.userId;

    const newOrg = await organizationModel.create({
        title: req.body.title,
        description : req.body.description,
        admin: userId,
        members: []
    })

    res.json({
        message: "Org Created",
        id: newOrg._id
    })

})

app.post("/add-member-to-organization", async(req, res) => {

    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserame = req.body.memberUsername; // aakash (eg)

    //const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    const organization =await organizationModel.findOne({
        _id : organizationId,

    })
    
    if(!organization || !organization.admin.equals(userId)){
        return res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
    }

    //const memberUser = USERS.find(u => u.username === memberUserUserame)

    const memberUser = await userModel.findOne({
        username: memberUserame
    })

    if(!memberUser){
        return res.status(411).json({
            message: "No user with this username exists in our db"
        })
    }

    await organizationModel.updateOne({
        _id: organizationId
    }, {
        $push: {
            "members" : memberUser._id
        }
    })

    res.status(200).json({
        message: "New Member Added"
    })

})

app.post("/board", (req, res) => {

})

app.post("/issue",(req, res) => {

})




//READ 
app.get("/boards", (req, res) =>{

})

app.get("/issues",  (req, res) =>{

})

app.get("/members",  (req, res) =>{
    
})


app.get("/organizations", async (req, res) =>{
    const userId = req.userId
    const organizationId = req.query.organizationId;

    //const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    const organization = await organizationModel.findOne({
        _id: organizationId
    })

    if(!organization || !organization.admin.equals(userId)){
        return res.status(403).json({
            message: "Either this org doesn't exists or you are not an admin of this org"
        })
    }

    res.json({
        organization: organization
    })
})


//update
app.put("/issues", (req, res) =>{

})


// Delete:
app.delete("/members", async (req, res) =>{
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUsername = req.body.memberUsername;
    
    // const organization = ORGANIZATIONS.find(org => org.id === organizationId);
    const organization =await organizationModel.findOne({
        _id: organizationId
    })
   
   if(!organization || !organization.admin.equals(userId)){
        return res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
    }

    //const memberUser = USERS.find(u => u.username === memberUserame)

    const memberUser =await userModel.findOne({
        username: memberUsername
    })

    if(!memberUser){
        return res.status(411).json({
            message: "No user with this username exists in our db"
        })
    }

    //organization.members = organization.members.filter(id => id !== memberUser.id);
    await organizationModel.updateOne({
        _id: organizationId
    }, {
        $pull: {
            "members" : memberUser._id
        }
    })

    res.status(200).json({
        message: "Member Deleted"
    })

})

app.listen(3000);
