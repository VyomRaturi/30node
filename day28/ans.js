const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const port = 3000;

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
      console.log("Received:", message);

      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
}

app.get("/", (req, res) => {
  res.send("Hello I am server!");
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  setupWebSocketServer(server);
});
