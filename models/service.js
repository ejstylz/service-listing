const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    title: String,
    priceFrom: String,
    priceTo: String,
    description: String,
    images: [
        { url: String, public_id: String }
    ],
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    time: String,
    teamMembers: String,
    products: String,
    tags: String,
    serviceType: String,
    category: String,
    priceInfo: String,
    teamInfo: String
});

module.exports = mongoose.model('Service', ServiceSchema);
