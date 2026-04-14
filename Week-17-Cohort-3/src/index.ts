import { Client } from "pg";
import express from "express"
import 'dotenv/config'

const app = express();
app.use(express.json());
const pgClient = new Client(process.env.SQL_STRING);
console.log("DB URL: ", process.env.SQL_STRING);


async function reading(){
    await pgClient.connect();

    const response = await pgClient.query("SELECT * FROM users;")
    console.log(response.rows);

}


app.post("/signup", async (req, res) =>{

    await pgClient.connect();
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`
    const values = [username, email, password];

    const response = await pgClient.query(insertQuery, values)
    console.log("insert succesfully : " , response);
    res.json({
        message: "You have signed up"
    })
})

app.listen(3000);