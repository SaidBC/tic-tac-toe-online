function checkGame(board) {
  const checkBoard = Array.from(board);
  board.forEach((_, i) => {
    checkBoard.push([board[0][i], board[1][i], board[2][i]]);
  });
  checkBoard.push([board[0][0], board[1][1], board[2][2]]);
  checkBoard.push([board[2][0], board[1][1], board[0][2]]);

  for (let i = 0; i < checkBoard.length; i++) {
    if (!~checkBoard[i].indexOf(0) && !~checkBoard[i].indexOf(2)) {
      return {
        status: "gameover",
        winner: "x",
      };
    }
    if (!~checkBoard[i].indexOf(0) && !~checkBoard[i].indexOf(1)) {
      return {
        status: "gameover",
        winner: "o",
      };
    }
  }
  if (board.every((cell) => !~cell.indexOf(0))) {
    return {
      status: "gameover",
      winner: false,
    };
  }
  return {
    status: "pending",
    winner: false,
  };
}
export default checkGame;
