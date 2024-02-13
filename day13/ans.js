const http = require("http");
const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = http.createServer(app);
/**
 * WebSocket server for Express
 * @param {Object} server - HTTP server instance
 */
function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server, path: "/websocket" });
    wss.on("connection", (ws) => {
        ws.on("message", (message) => {
            console.log(`Received message => ${message}`);
            ws.send(message);
        });
    });
}
setupWebSocket(server);

app.get("/websocket", (req, res) => {
    res.send(`
    <html>
    <head>
        <title>WebSocket</title>
    </head>
    <body>
        <h1>WebSocket</h1>
        <input type="text" id="message" />
        <button onclick="sendMessage()">Send</button>
        <script>
            const ws = new WebSocket("ws://localhost:3000/websocket");
            ws.onopen = () => {
                console.log("Connected to server");
            };
            ws.onmessage = (event) => {
                console.log("Message received => ", event.data);
            };
            function sendMessage() {
                const message = document.getElementById("message").value;
                ws.send(message);
            }
        </script>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
