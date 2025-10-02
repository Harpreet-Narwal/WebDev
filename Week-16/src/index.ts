import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 8080})


// Event Handler

wss.on("connection", function(socket){
    // socket -> similar to req, res

    console.log("user connected");
    setInterval(() => {
        socket.send("Current price of Solana is "  + Math.random());
    }, 1000)
    socket.send("hi there");

    socket.on("message", (e) =>{
        console.log(e.toString());
    })

});


