const mongoose = require('mongoose');


const musicSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    artist: String,
    album: String,
    url: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Music', musicSchema);