const jwt = require("jsonwebtoken");
const checkGame = require("../utils/checkGame");
const Room = require("../models/Room");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const onSendGame = function (roomId, io) {
  return async (data) => {
    const room = await Room.findOne({ roomId });
    if (room.currentGame.gameStatus.status === "pending") {
      let { index, turn, token } = data;
      try {
        const player = jwt.verify(token, JWT_SECRET);
        if (room.currentGame.turn === player.initialTurn) {
          const board = room.currentGame.board;
          let temp = Array.from(board);
          const x = Math.floor(index / 3);
          const y = index % 3;
          temp[x][y] = turn === "x" ? 1 : 2;
          turn = turn === "x" ? "o" : "x";
          const result = checkGame(temp);
          const { results } = room;
          if (result.status == "gameover") {
            room.currentGame.gameStatus = result;
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
          room.currentGame.board = temp;
          room.currentGame.turn = turn;
          await room.save();
          io.in(roomId).emit("recieve-game", room);
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
