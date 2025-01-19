const Room = require("../models/Room");

async function countdown(roomId, io, timerId) {
  const room = await Room.findOne({ roomId });
  io.in(roomId).emit("countdown", room.currentGame.timer);
  if (room.currentGame.gameStatus.status === "gameover")
    return clearInterval(timerId);
  const { turn } = room.currentGame;
  const closeIntevalCondition =
    room.currentGame.timer.x > 0 && room.currentGame.timer.o > 0;

  if (closeIntevalCondition) {
    room.currentGame.timer[turn]--;
    await room.save();
  } else {
    const winner =
      (room.currentGame.timer.x !== 0 && "x") ||
      (room.currentGame.timer.o !== 0 && "o");
    room.currentGame.gameStatus = {
      winner,
      status: "gameover",
    };
    room.results[winner]++;
    await room.save();
    io.in(roomId).emit("recieve-game", room);
    clearInterval(timerId);
  }
}
module.exports = countdown;
