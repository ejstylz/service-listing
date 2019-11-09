const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    name: String,
    Category: String,
    description: String,
    images: [
        { url: String, public_id: String }
    ],
    startTime: String,
    endTime: String,
    budget: Number,
    teamMembers: Number,
    expertise: String,
    products: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports = mongoose.model('Portfolio', PortfolioSchema);