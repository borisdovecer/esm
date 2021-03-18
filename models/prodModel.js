const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prodSchema = new Schema({
    title: {
        type: String
    },
    short_title: {
        type: String
    },
    content_text: {
        type: String
    },
    lang: {
        type: String
    },
    image: {
        type: String
    },
    gallery: {
        type: Array
    },
    slug: {
        type: String
    }
});

module.exports = mongoose.model('prod', prodSchema);