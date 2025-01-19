const jwt = require("jsonwebtoken");
const countdown = require("../utils/countdown");
const Room = require("../models/Room");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const { parse, stringify } = JSON;
const onNextRound = function (roomId, io, socket, initialGame) {
  return async (token, cb) => {
    try {
      const room = await Room.findOne({ roomId });
      const player = jwt.verify(token, JWT_SECRET);
      room.readyQueue ??= [];
      const isPlayersReady = room.readyQueue.length >= 1;

      if (isPlayersReady) {
        if (room.readyQueue[0].playerId !== player.playerId) {
          room.currentGame = parse(stringify(initialGame));
          delete room.readyQueue;
          await room.save();
          io.in(roomId).emit("popup-alert", {
            title: "GAME IS STARTED",
            content: `players are ready game started`,
          });
          io.in(roomId).emit("recieve-game", room);
          const timerId = setInterval(
            () => countdown(roomId, io, timerId),
            1000
          );
        }
      } else {
        room.readyQueue.push(player);
        await room.save();
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
