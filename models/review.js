const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    text: String,
    reply: String,
    images: [
        { url: String, public_id: String }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
