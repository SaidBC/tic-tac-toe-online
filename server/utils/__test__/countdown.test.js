const countdown = require("../countdown");
const Room = require("../../models/Room");

// Mock the Room model
jest.mock("../../models/Room");

describe("countdown", () => {
  let mockIo;
  let mockRoom;
  let mockTimerId;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock socket.io
    mockIo = {
      in: jest.fn().mockReturnThis(),
      emit: jest.fn(),
    };

    // Mock room data
    mockRoom = {
      currentGame: {
        timer: { x: 10, o: 10 },
        gameStatus: { status: "playing" },
        turn: "x",
      },
      results: { x: 0, o: 0 },
      save: jest.fn(),
    };

    // Mock timer ID
    mockTimerId = 123;

    // Setup Room.findOne mock
    Room.findOne.mockResolvedValue(mockRoom);
  });

  test("should decrease timer for current turn", async () => {
    await countdown("room123", mockIo, mockTimerId);

    expect(Room.findOne).toHaveBeenCalledWith({ roomId: "room123" });
    expect(mockIo.in).toHaveBeenCalledWith("room123");
    expect(mockIo.emit).toHaveBeenCalledWith(
      "countdown",
      mockRoom.currentGame.timer
    );
    expect(mockRoom.currentGame.timer.x).toBe(9);
    expect(mockRoom.save).toHaveBeenCalled();
  });

  test("should end game when a player runs out of time", async () => {
    mockRoom.currentGame.timer.x = 0;

    await countdown("room123", mockIo, mockTimerId);

    expect(mockRoom.currentGame.gameStatus).toEqual({
      winner: "o",
      status: "gameover",
    });
    expect(mockRoom.results.o).toBe(1);
    expect(mockRoom.save).toHaveBeenCalled();
    expect(mockIo.emit).toHaveBeenCalledWith("recieve-game", mockRoom);
  });

  test("should clear interval if game is over", async () => {
    mockRoom.currentGame.gameStatus.status = "gameover";
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    await countdown("room123", mockIo, mockTimerId);

    expect(clearIntervalSpy).toHaveBeenCalledWith(mockTimerId);
    clearIntervalSpy.mockRestore();
  });
});
