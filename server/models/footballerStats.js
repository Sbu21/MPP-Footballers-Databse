const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footballerStatsSchema = new Schema({
    season: String,
    gamesPlayed: Number,
    goals: Number,
    assists: Number
});

module.exports = mongoose.model('FootballerStats', footballerStatsSchema);