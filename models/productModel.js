const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
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
    slug: {
        type: String
    }
});

module.exports = mongoose.model('product', productSchema);