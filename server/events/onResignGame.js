const jwt = require("jsonwebtoken");
const Room = require("../models/Room");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const onResignGame = function (roomId, io) {
  return async (token) => {
    try {
      const room = await Room.findOne({ roomId });
      const player = jwt.verify(token, JWT_SECRET);
      const winner = player.initialTurn == "x" ? "o" : "x";
      room.currentGame.gameStatus = {
        winner,
        status: "gameover",
      };
      room.results[winner]++;
      await room.save();
      io.in(roomId).emit("recieve-game", room);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = onResignGame;
