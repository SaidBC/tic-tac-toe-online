const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const onResignGame = function (roomsQueue, roomId, io) {
  return (token) => {
    try {
      const player = jwt.verify(token, JWT_SECRET);
      const winner = player.initialTurn == "x" ? "o" : "x";
      roomsQueue[roomId].currentGame.gameStatus = {
        winner,
        status: "gameover",
      };
      roomsQueue[roomId].results[winner]++;
      io.in(roomId).emit("recieve-game", roomsQueue[roomId]);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = onResignGame;
