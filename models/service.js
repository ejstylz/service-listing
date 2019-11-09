const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: String,
    price: String,
    description: String,
    images: [
        { url: String, public_id: String }
    ],
    from: String,
    to: Array,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    time: String,
    teamMembers: String,
    products: [String],
    tags: [String]
});

module.exports = mongoose.model('Service', ServiceSchema);
