import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './App.css';
//dumb fashion
function App() {
    const [socket, setSocket] = useState();
    function sendMessage() {
        if (!socket) {
            return;
        }
        socket.send("ping");
    }
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);
        ws.onmessage = (event) => {
            alert(event.data);
        };
        ws.onerror = () => {
        };
        ws.close = () => {
        };
        ws.onopen = () => {
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("input", { type: 'text', placeholder: 'Message' }), _jsx("button", { onClick: sendMessage, children: "Send" }), "hi there"] }));
}
export default App;
//# sourceMappingURL=App.js.map