module.exports = function (io) {

    const express = require('express');
    const router = express.Router();
    const User = require('../models/users');
    const Chat = require('../models/chat');

    io.on('connection', async function (socket) {
        let senderId = socket.handshake.headers.referer.split("x/").pop();
        let other = await User.findById(senderId);
        console.log(socket.request.user.username + " connected");

        // Accept a login event with user's data
        // if (socket.request.user && socket.request.user.logged_in) {
        //     let link = socket.handshake.headers.referer.split("x/").pop();
        //     console.log(link.toString());
        // }

        // Accept a login event with user's data
        if (socket.request.user && socket.request.user.logged_in) {
            socket.request.user.status = true;
            console.log(socket.request.user.status);
        } else if (!socket.request.user.logged_in) {
            socket.request.user.status = false;
            console.log(socket.request.user.status);
        }


        console.log('Okay');
        let user = socket.request.user;
        // console.log(user);

        // Create function to send status
        sendStatus = function (s) {
            socket.emit('status', s);
        }
        let userId = user._id;
        let otherId = other._id;
        const chat = await Chat.find({ participants: { $in: [user, other] } }).sort({ _id: -1 });

        await socket.emit('output', chat);

        // Handle input events
        socket.on('input', async function (data) {
            // let name = data.name;
            let message = data.message;

            // Check for name and message
            if (message == '') {
                // Send error status
                sendStatus('Please enter a message');
            } else {

                // await chat.messages.push({
                //     text: message,
                //     sender: {
                //         id: user._id,
                //         username: user.username
                //     },
                //     receiver: {
                //         id: other._id,
                //         username: other.username
                //     }
                // });
                // chat.save();

                // Insert message
                const newChat = new Chat({
                    messages: {
                        text: message,
                        sender: {
                            id: user._id,
                            username: user.username
                        },
                        receiver: {
                            id: other._id,
                            username: other.username
                        }
                    },
                    participants: [
                        user, other,
                    ]
                });

                Chat.create(newChat, async function () {
                    const data = {
                        name: user.username,
                        message: message
                    }
                    io.emit('output', [data]);

                    // Send status object
                    // sendStatus({
                    //     message: 'Message sent',
                    //     clear: true
                    // });
                    if (!chat.length) {
                        await user.conversations.push(newChat);
                        user.save();
                        await other.conversations.push(newChat);
                        other.save();
                    }
                });

            }
        });

    });


    return router;
}