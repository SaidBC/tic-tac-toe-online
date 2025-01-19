require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const { randomUUID } = require("crypto");
const generateToken = require("./utils/generateToken");
const onSendGame = require("./events/onSendGame");
const onResignGame = require("./events/onResignGame");
const countdown = require("./utils/countdown");
const onNextRound = require("./events/onNextRound");
const connectDB = require("./configs/db");
const WaitingRoom = require("./models/WaitingRoom");
const Room = require("./models/Room");
const { parse, stringify } = JSON;
const PORT = 8000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
const initialGame = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  turn: "x",
  gameStatus: {
    status: "pending",
    winner: false,
  },
  timer: {
    x: 60,
    o: 60,
  },
};

io.on("connection", async (socket) => {
  console.log("A USER CONNECTED", socket.id);
  socket.on("join-room", async (roomId) => {
    if (!roomId) {
      const waitingRoom = await WaitingRoom.findOne({});

      if (!waitingRoom) {
        roomId = randomUUID();
        await WaitingRoom.create({ roomId });
        socket.join(roomId);
        socket.on("disconnect", async () => {
          await WaitingRoom.deleteOne({ roomId });
        });
      } else {
        roomId = waitingRoom.roomId;
        socket.join(roomId);
        const players = Array.from(io.sockets.adapter.rooms.get(roomId));
        await WaitingRoom.deleteOne({ _id: waitingRoom._id });
        await Room.create({
          roomId,
          players,
        });
        io.to(roomId).emit("save-to-storage", "roomId", roomId);
        const p1 = generateToken({ playerId: players[0], initialTurn: "x" });
        io.to(players[0]).emit("save-to-storage", "player", p1);
        const p2 = generateToken({ playerId: players[1], initialTurn: "o" });
        io.to(players[1]).emit("save-to-storage", "player", p2);
        io.to(roomId).emit("redirect", `./${roomId}`);
        const timerId = setInterval(() => countdown(roomId, io, timerId), 1000);
      }
    } else {
      const room = await Room.findOne({ roomId });
      if (room) {
        socket.join(roomId);
        io.in(roomId).emit("initial-recieve-game", room);
        socket.emit("redirect", `./${roomId}`, "/play/online");
        socket.on("resign-game", onResignGame(roomId, io));
        socket.on("send-game", onSendGame(roomId, io));
        socket.on("next-round", onNextRound(roomId, io, socket, initialGame));
      } else {
        socket.emit("redirect", `../`);
        socket.emit("clear-storage");
      }
    }
  });
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("THE APP IS RUNNING AT PORT", PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
