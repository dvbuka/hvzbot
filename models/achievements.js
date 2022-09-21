const mongoose = require("mongoose");

const achievements = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    description: {type: String, require: false},
});

const model = mongoose.model("achievements", achievements);

module.exports = model;