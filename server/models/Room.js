const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: String,
  currentGame: {
    board: {
      type: [[Number]],
      default: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    turn: {
      type: String,
      default: "x",
    },
    gameStatus: {
      status: {
        type: String,
        enum: ["pending", "gameover"],
        default: "pending",
      },
      winner: {
        type: mongoose.Schema.Types.Mixed,
        enum: ["x", "o", false],
        default: false,
      },
    },
    timer: {
      x: {
        type: Number,
        default: 60,
      },
      o: {
        type: Number,
        default: 60,
      },
    },
  },
  results: {
    x: {
      type: Number,
      default: 0,
    },
    tie: {
      type: Number,
      default: 0,
    },
    o: {
      type: Number,
      default: 0,
    },
  },
  games: [Object],
  players: [String, String],
  readyQueue: [Object],
});

module.exports = mongoose.model("Room", roomSchema);
