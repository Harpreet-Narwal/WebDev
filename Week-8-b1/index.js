// import {express} from express
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) =>{
    res.sendFile("/Users/happy/Desktop/100xBootcamp/Week-8-b1/index.html");
}) 


app.get("/sum", (req, res) =>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const sum = a + b;
    res.status(200).send(sum.toString());
});


app.get("/sub/:a/:b", (req, res) =>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sub = a - b;
    res.status(200).send(sub.toString());
});


app.get("/mul", (req, res) =>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const mul = a * b;
    res.status(200).send(mul.toString());
});


app.get("/div", (req, res) =>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const div = a / b;
    res.status(200).send(div.toString());
});


app.listen(3000);

