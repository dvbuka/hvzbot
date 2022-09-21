const mongoose = require("mongoose");

const playerAchievements = new mongoose.Schema({
    playerID: {type: String, require: true, unique: true},
    oldhead: {type: Boolean, require: false},
    a2022participant: {type: Boolean, require: false},
});

const model = mongoose.model("playerAchievements", playerAchievements);

module.exports = model;