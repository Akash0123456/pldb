const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    // ID
    _id: mongoose.Schema.Types.ObjectId,

    // Basic game info
    date: { type: Date, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },

    // Additional game details
    season: {type: String}, // e.g., "2022/2023"
    referee: {type: String}, // Name of the referee

    // Scores
    homeTeamScore: { type: Number, default: 0 },
    awayTeamScore: { type: Number, default: 0 },

    // Game status
    status: {type: String},

    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;