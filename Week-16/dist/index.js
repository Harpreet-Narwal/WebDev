"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// Event Handler
wss.on("connection", function (socket) {
    // socket -> similar to req, res
    console.log("user connected");
    setInterval(() => {
        socket.send("Current price of Solana is " + Math.random());
    }, 1000);
    socket.send("hi there");
    socket.on("message", (e) => {
        console.log(e.toString());
    });
});
//# sourceMappingURL=index.js.map