const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware")

const app = express();

app.use(express.json());

const jwtSecret = "harpreet2301"
const notes = [{username: "harkirat", note: "go to gym"}]; // this is bad -- eventually we'll learn about databases (mongodb, postgres);
const users = [{
    username:"harpreet",
    password: "123123"
}]


app.post("/signup", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username);

    if(userExists){
        return res.status(403).json({
            message: "Uesr with this username already exists"
        })
    }

    users.push({username: username, password: password})

    res.json({
        message: "You have signed up"
    })
})


app.post("/signin", authMiddleware, (req, res) =>{
    const {username, password } = req.body;

    const userExists = users.find(user => user.username === username && user.password === password);

    if(!userExists){
        return res.status(403).json({
            message: "Incorrect credentials"
        })
    }
    // json web tokens  | stateless, verifiable
    const token = jwt.sign({
        username: username
    }, jwtSecret)
    res.json({
        token: token
    })
    
})

app.post("/notes", authMiddleware,  (req , res) =>{
    //    const {title, description} = req.body;
    const username = req.username;
    const note = req.body.note; 
    notes.push({username, note});

    res.status(200).json({
        message: 'Note stored'
    })
})


app.get("/notes",authMiddleware,  (req, res) =>{
    const username = req.username;
    const userNotes = notes.filter(note => note.username === username)
    
    res.status(200).json({userNotes});
})


app.get('/', (req, res) =>{
    res.sendFile("/Users/happy/Desktop/100xBootcamp/Week-9/frontend/index.html")
})

app.listen(3000);