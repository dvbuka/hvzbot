const mongoose = require("mongoose");

const botSetup = new mongoose.Schema({
    zombieRole: {type: String, require: true, unique: true},
    zombieChannel: {type: String, require: true, unique: true},
    humanRole: {type: String, require: true, unique: true},
    humanChannel: {type: String, require: true, unique: true},
});

const model = mongoose.model("botSetup", botSetup);

module.exports = model;