const jwt = require("jsonwebtoken");
const countdown = require("../utils/countdown");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const { parse, stringify } = JSON;
const onNextRound = function (roomsQueue, roomId, io, socket, initialGame) {
  return (token, cb) => {
    try {
      const player = jwt.verify(token, JWT_SECRET);
      roomsQueue[roomId].readyQueue ??= [];
      const isPlayersReady = roomsQueue[roomId].readyQueue.length >= 1;

      if (isPlayersReady) {
        if (roomsQueue[roomId].readyQueue[0].playerId !== player.playerId) {
          roomsQueue[roomId].currentGame = parse(stringify(initialGame));
          delete roomsQueue[roomId].readyQueue;
          io.in(roomId).emit("popup-alert", {
            title: "GAME IS STARTED",
            content: `players are ready game started`,
          });
          io.in(roomId).emit("recieve-game", roomsQueue[roomId]);
          const timerId = setInterval(
            () => countdown(roomsQueue, roomId, io, timerId),
            1000
          );
        }
      } else {
        roomsQueue[roomId].readyQueue.push(player);
        socket.broadcast.to(roomId).emit("popup-alert", {
          title: "Waiting for response",
          content: `${player.initialTurn} is waiting for next round`,
        });
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = onNextRound;
