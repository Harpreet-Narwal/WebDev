const express = require("express");
const { authMiddleware } = require("./middleware");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "secret123123"

let CURRENT_USER_ID = 1;
let CURRENT_TODO_ID = 1;

let USERS = [];
let TODO = [];

app.use(express.json());

app.post("/signup", (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    const existingUser = USERS.find(u => u.username === username);

    if(existingUser){
        return res.status(409).json({
            error: "User already exists"
        })
    }

    const newUser = {
        id: CURRENT_USER_ID++,
        username, 
        password
    }

    USERS.push(newUser)
    return res.status(201).json({
        message: "User created",
        user: newUser,
        id: CURRENT_USER_ID-1
    })
})

app.post("/signin", (req, res) =>{

    const { username, password } = req.body;
    
    const existingUser = USERS.find(u => u.username === username && u.password ===  password);

    if(!existingUser){
        return res.status(401).json({
            error: "User not found or Incorrect credentials"
        })
    }

    const token = jwt.sign({
        userId : existingUser.id
    }, JWT_SECRET, {expiresIn: '1h'})

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000 // 1 hr
    })


    return res.status(200).json({
        token
    })
})


app.use(authMiddleware);

app.post("/todos", (req, res) =>{
    const userId = req.userId;
    const { title, description } = req.body;
    console.log(userId);

    const todo = {
        id: CURRENT_TODO_ID++,
        title,
        description,
        userId
    }
    
    TODO.push(todo)

    res.json({
        message: "Todo made",
        todo: todo
    })
})


app.delete("/todos/:todoId", (req, res) =>{
    const todoId = parseInt(req.params.todoId);
    const userId = req.userId;

    const todoInd = TODO.findIndex(t => t.id === todoId);
    
    if(todoInd === -1){
        return res.status(404).json({
            message: "Todo not found"
        })
    }

    if(TODO[todoInd].userId !== userId){
        return res.status(403).json({
            error: "You are not authorized to delete this todo"
        });
    }

    TODO.splice(todoInd, 1);
    return res.status(200).json({
        message: "Todo deleted"
    })
})

app.get("/todos" , (req, res) =>{
    const userId = req.userId;

    const userTodos = TODO.filter(t => t.userId ===  userId);

    return res.status(200).json({
        todos: userTodos
    })
})

app.listen(3000, () =>{
    console.log("Server Up")
})