const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String
    },
    lang: {
        type: String
    },
    description: {
        type: String
    },
    content_text: {
        type: String
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    createdOn: {
        type: Date
    },
    slug: {
        type: String
    }
});

module.exports = mongoose.model('news',newsSchema);