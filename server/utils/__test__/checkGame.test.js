const checkGame = require("../checkGame");

describe("checkGame", () => {
  test("should detect X winning horizontally", () => {
    const board = [
      [1, 1, 1], // X wins in first row
      [2, 2, 0],
      [0, 0, 2],
    ];
    expect(checkGame(board)).toEqual({
      status: "gameover",
      winner: "x",
    });
  });

  test("should detect O winning vertically", () => {
    const board = [
      [2, 1, 1],
      [2, 1, 0],
      [2, 0, 0], // O wins in first column
    ];
    expect(checkGame(board)).toEqual({
      status: "gameover",
      winner: "o",
    });
  });

  test("should detect X winning diagonally", () => {
    const board = [
      [1, 2, 0],
      [2, 1, 0],
      [0, 2, 1], // X wins diagonally
    ];
    expect(checkGame(board)).toEqual({
      status: "gameover",
      winner: "x",
    });
  });

  test("should detect a draw", () => {
    const board = [
      [1, 2, 1],
      [1, 2, 2],
      [2, 1, 1], // No winner, board full
    ];
    expect(checkGame(board)).toEqual({
      status: "gameover",
      winner: false,
    });
  });

  test("should detect game still pending", () => {
    const board = [
      [1, 2, 1],
      [0, 2, 2],
      [0, 1, 1], // Game still in progress
    ];
    expect(checkGame(board)).toEqual({
      status: "pending",
      winner: false,
    });
  });
});
