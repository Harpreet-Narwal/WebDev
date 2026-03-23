require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");
const app = express();
const JWT_PASS = process.env.JWT_PASS

const jwtSecret = JWT_PASS
app.use(express.json());


// usernsme, password | USERS Table
// organization | ORGANIZATION Table
// boards | BOARDS Table
// Issues | ISSUES Table

let USERS_ID = 3;
let ORGANIZATION_ID = 3;
let BOARD_ID = 2;
let ISSUES_ID = 3;

// Examples:

const USERS = [{
    id:1,
    username: "Harkirat",
    password: "123123"
}, {
    id:2,
    username : "raman",
    password : "123123"
}];

const ORGANIZATIONS = [{
    id: 1,
    title: "100xdevs",
    description: "Learning coding platform",
    admin: 1,
    members: [2]
}, {
    id: 2,
    title: "ramans orgs",
    description: "Experimenting",
    admin: 1,
    members: []
}];

const BOARDS = [{
    id: 1,
    title: "100xSchool website (frontend)",
    organizationId: 1
}];
const ISSUES = [{
    id: 1,
    title: "Add dark mode",
    boardId: 1,
    state: "IN_PROGRESS"
}, {
    id: 2,
    title : "allow admins to create more courses",
    boardId: 1,
    issues: "DONE"
}];

// CREATE
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username);

    if(userExists){
        res.status(411).json({
            message: "User with this username already exists"
        })
        return;
    }

    USERS.push({
        id: USERS_ID++,
        username: username,
        password: password
    })
    return res.status(200).json({
        message: "User Signed Up successfully"
    })


})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username && u.password === password);
    if(!userExists){
        res.status(403).json({
            message: "Incorrect Credentials"
        })
        return
    }

    const token = jwt.sign({
        userId: userExists.id
    }, JWT_PASS);


    res.status(200).json({
        message: "User Signed In",
        jwt: token
    })

})

app.use(authMiddleware);

app.post("/organization",(req, res) => {
    const userId = req.userId;
    ORGANIZATIONS.push({
        id: ORGANIZATION_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: userId, 
        members: []
    })

    res.json({
        message: "Org Created",
        id: ORGANIZATION_ID - 1
    })

})

app.post("/add-member-to-organization",(req, res) => {

    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUserame = req.body.memberUserUsername;

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);
    if(!organization || organization.admin !== userId){
        return res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
    }

    const memberUser = USERS.find(u => u.username === memberUserUserame)

    if(!memberUser){
        return res.status(411).json({
            message: "No user with this username exists in our db"
        })
    }

    organization.members.push(memberUser.id)

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


app.get("/organizations", (req, res) =>{
    const userId = req.userId
    const organizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if(!organization || organization.admin !== userId){
        return res.status(403).json({
            message: "Either this org doesn't exists or you are not an admin of this org"
        })
    }

    res.json({
        ...organization,
        members: organization.members.map(memberId =>{
            const user = USERS.find(user => user.id === memberId)
            return {
                id: user.id,
                username: user.username
            }
        })
    })


})


//update
app.put("/issues", (req, res) =>{

})


// Delete:
app.delete("/members", (req, res) =>{
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUsernUserame = req.body.memberUserUserame;

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);
    if(!organization || organization.admin !== userId){
        return res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
    }

    const memberUser = USERS.find(u => u.username === memberUsernUserame)

    if(!memberUser){
        return res.status(411).json({
            message: "No user with this username exists in our db"
        })
    }

    organization.members = organizations.members.filter(id => id !== memberUser.id);


    res.status(200).json({
        message: "New Member Added"
    })

})

app.listen(3000);
