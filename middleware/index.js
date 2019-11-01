const User = require('../models/users');


module.exports = {
    asyncErrorHandler: (fn) => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    },

    checkIfUserExists: async (req, res, next) => {
        let emailExists = await User.findOne({ 'email': req.body.email });
        let usernameExists = await User.findOne({ 'username': req.body.username });
        if (emailExists) {
            req.session.error = "Email already exists";
            console.log('Email already exists');
            return res.redirect('back');
        }
        else if (usernameExists) {
            req.session.error = "Username already exists";
            console.log('Username already exists');
            return res.redirect('back');
        }
        next();
    },

    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        // console.log('You need to be logged in to do that');
        req.session.redirectTo = req.originalUrl;
        req.session.error = "You need to be logged in to do that";
        res.redirect('/login');
    }
};
