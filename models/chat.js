const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChatSchema = new Schema({

    messages: {
        text: String,
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
        receiver: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});


module.exports = mongoose.model('Chat', ChatSchema);