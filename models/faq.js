const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
    title: String,
    body: String
});

module.exports = mongoose.model('Faq', FaqSchema);
