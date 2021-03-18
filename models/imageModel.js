const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    filename: {
        type: String
    },
    url: {
        type: String
    },
    createdOn: {
        type: Date
    }
});

module.exports = mongoose.model('image',imageSchema);