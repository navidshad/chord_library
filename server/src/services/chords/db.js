const songCollections = require('./db_song');
const chordCollections = require('./db_chord');

module.exports = [
    ...songCollections,
    ...chordCollections
]
