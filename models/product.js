const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
    tags: [String],
    timeOfDelivery: String,
    specification: {
        title: String, description: String
    }
});

module.exports = mongoose.model('Product', ProductSchema);
