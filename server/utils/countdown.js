function countdown(roomsQueue, roomId, io, timerId) {
  io.in(roomId).emit("countdown", roomsQueue[roomId].currentGame.timer);
  if (roomsQueue[roomId].currentGame.gameStatus.status === "gameover")
    return clearInterval(timerId);
  const { turn } = roomsQueue[roomId].currentGame;
  const closeIntevalCondition =
    roomsQueue[roomId].currentGame.timer.x > 0 &&
    roomsQueue[roomId].currentGame.timer.o > 0;

  if (closeIntevalCondition) {
    roomsQueue[roomId].currentGame.timer[turn]--;
  } else {
    const winner =
      (roomsQueue[roomId].currentGame.timer.x !== 0 && "x") ||
      (roomsQueue[roomId].currentGame.timer.o !== 0 && "o");
    roomsQueue[roomId].currentGame.gameStatus = {
      winner,
      status: "gameover",
    };
    roomsQueue[roomId].results[winner]++;
    io.in(roomId).emit("recieve-game", roomsQueue[roomId]);
    clearInterval(timerId);
  }
}
module.exports = countdown;
