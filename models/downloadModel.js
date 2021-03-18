const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const downloadSchema = new Schema({
    title: {
        type: String
    },
    filename: {
        type: String
    },
    category: {
        type: String
    },
    lang: {
        type: String
    }
});

module.exports = mongoose.model('download',downloadSchema);