const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    price: String,
    title: String,
    category: String,
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
    tags: String,
    specificationTitle: String,
    specificationDescription: String,
    deliveryInfo: String
});

module.exports = mongoose.model('Product', ProductSchema);
