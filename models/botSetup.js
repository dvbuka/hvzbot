const mongoose = require("mongoose");

const achievements = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    propID: {type: String, require: true},
});

const model = mongoose.model("botSetup", botSetup);

module.exports = model;