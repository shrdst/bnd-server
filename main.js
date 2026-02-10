const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("public"));

const serverPort = process.env.PORT || 3000;
const server = http.createServer(app);
const WebSocket = require("ws");

let keepAliveId;

const wss =
  process.env.NODE_ENV === "production"
    ? new WebSocket.Server({ server })
    : new WebSocket.Server({ port: 5001 });

server.listen(serverPort);
console.log(`Server started on port ${serverPort} in stage ${process.env.NODE_ENV}`);

wss.on("connection", function (ws, req) {
  if (wss.clients.size === 1) {
    keepServerAlive();
  }

  ws.on("message", (data) => {
    let stringifiedData = data.toString();
    if (stringifiedData === 'pong') {
      return;
    }
    broadcast(ws, stringifiedData, false);
  });

  ws.on("close", () => {
    if (wss.clients.size === 0) {
      clearInterval(keepAliveId);
    }
  });
});

const broadcast = (ws, message, includeSelf) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      if (includeSelf || client !== ws) {
        client.send(message);
      }
    }
  });
};

const keepServerAlive = () => {
  keepAliveId = setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('ping');
      }
    });
  }, 50000);
};
