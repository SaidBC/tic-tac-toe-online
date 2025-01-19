const mongoose = require("mongoose");

const waitingRoomSchema = new mongoose.Schema({
  roomId: String,
  createdAt: { type: Date, expires: 3600, default: Date.now },
});

module.exports = mongoose.model("WaitingRoom", waitingRoomSchema);
