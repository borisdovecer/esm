const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    title: {
        type: String
    },
    name: {
        type: String
    },
    phone1: {
        type: String
    },
    phone2: {
        type: String
    },
    email1: {
        type: String
    },
    email2: {
        type: String
    }
});

module.exports = mongoose.model('contact',contactSchema);