const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    notes: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: 'unknown',
    }
});

module.exports = Player = mongoose.model('player', PlayerSchema);