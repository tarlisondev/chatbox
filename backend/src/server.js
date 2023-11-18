const { WebSocketServer } = require("ws");
require("dotenv").config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on("connection", async (ws) => {
  ws.on("error", console.error);

  ws.on('message', async (data) => {
    wss.clients.forEach((client) => client.send(data.toString()))
  });
  console.log({ message: "client Connected" })
});