import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";

const PORT = 8001 || env.PORT;

const app = express();
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => generatePrice(socket), 1000);

  socket.on("disconnet", () => {
    console.log("Cliend Disconnected");
    clearInterval(interval);
  });
});

const generatePrice = (socket) => {
  const response = new Date();

  socket.emit("DateAPI", response);
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
