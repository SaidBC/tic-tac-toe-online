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
const { parse, stringify } = JSON;
const PORT = 8000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
const waitingRooms = [];
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
const initialRoom = {
  currentGame: parse(stringify(initialGame)),
  results: {
    x: 0,
    tie: 0,
    o: 0,
  },
  games: [],
};
const roomsQueue = {
  id: {
    games: [],
    currentGame: {
      board: [],
      turn: "x" || "o",
      gameStatus: {
        status: "pending",
        winner: false,
      },
      timer: {
        x: 60,
        o: 60,
      },
    },
    results: {
      x: 0,
      tie: 0,
      o: 0,
    },
    players: ["p1-id", "p2-id"],
  },
};
io.on("connection", async (socket) => {
  console.log("A USER CONNECTED", socket.id);
  socket.on("join-room", (roomId) => {
    if (!roomId) {
      if (!waitingRooms.length) {
        roomId = randomUUID();
        waitingRooms.push(roomId);
        socket.join(roomId);
        socket.on("disconnect", () => {
          waitingRooms.splice(waitingRooms.indexOf(roomId), 1);
        });
      } else {
        roomId = waitingRooms[0];
        waitingRooms.splice(0, 1);
        socket.join(roomId);
        const players = Array.from(io.sockets.adapter.rooms.get(roomId));
        roomsQueue[roomId] = {
          ...parse(stringify(initialRoom)),
          players,
        };
        io.to(roomId).emit("save-to-storage", "roomId", roomId);
        const p1 = generateToken({ playerId: players[0], initialTurn: "x" });
        io.to(players[0]).emit("save-to-storage", "player", p1);
        const p2 = generateToken({ playerId: players[1], initialTurn: "o" });
        io.to(players[1]).emit("save-to-storage", "player", p2);
        io.to(roomId).emit("redirect", `./${roomId}`);
        const timerId = setInterval(
          () => countdown(roomsQueue, roomId, io, timerId),
          1000
        );
      }
    } else {
      if (roomsQueue[roomId]) {
        socket.join(roomId);
        io.in(roomId).emit("initial-recieve-game", roomsQueue[roomId]);
        socket.emit("redirect", `./${roomId}`, "/play/online");
        socket.on("resign-game", onResignGame(roomsQueue, roomId, io));
        socket.on("send-game", onSendGame(roomsQueue, roomId, io));
        socket.on(
          "next-round",
          onNextRound(roomsQueue, roomId, io, socket, initialGame)
        );
      } else {
        socket.emit("redirect", `../`);
        socket.emit("clear-storage");
      }
    }
  });
});

server.listen(PORT, () => {
  console.log("THE APP IS RUNNING AT PORT", PORT);
});
