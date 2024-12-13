const jwt = require("jsonwebtoken");
const checkGame = require("./checkGame");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const onSendGame = function (roomsQueue, roomId, io) {
  return (data) => {
    if (roomsQueue[roomId].currentGame.gameStatus.status === "pending") {
      let { index, turn, token } = data;
      try {
        const player = jwt.verify(token, JWT_SECRET);
        if (roomsQueue[roomId].currentGame.turn === player.initialTurn) {
          const board = roomsQueue[roomId].currentGame.board;
          let temp = Array.from(board);
          const x = Math.floor(index / 3);
          const y = index % 3;
          temp[x][y] = turn === "x" ? 1 : 2;
          turn = turn === "x" ? "o" : "x";
          const result = checkGame(temp);
          const { results } = roomsQueue[roomId];
          if (result.status == "gameover") {
            roomsQueue[roomId].currentGame.gameStatus = result;
            switch (result.winner) {
              case "x":
                results.x++;
                break;
              case "o":
                results.o++;
                break;
              default:
                results.tie++;
                break;
            }
          }
          roomsQueue[roomId].currentGame.board = temp;
          roomsQueue[roomId].currentGame.turn = turn;
          io.in(roomId).emit("recieve-game", roomsQueue[roomId]);
        } else {
          console.log("cannot play other player turns");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

module.exports = onSendGame;
