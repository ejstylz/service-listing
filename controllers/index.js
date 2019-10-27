const User = require('../models/users');
const passport = require('passport');

module.exports = {

    //GET /sign-up
    getSignup(req, res, next) {
        res.render('visitors/sign-up', { title: 'Sign Up' });
    },

    //POST /sign-up
    async postSignUp(req, res, next) {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
        });

        let user = await User.register(newUser, req.body.password);
        req.login(user, function (err) {
            if (err) return next(err);
            // req.session.success = "User Registered";
            console.log("USER REGISTERED!");
            res.redirect('/');
        });
    },

    //GET /login
    getLogin(req, res, next) {
        res.render('visitors/login', { title: 'Login' });
    },

    //POST /login
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if (!user && error) return next(error);
        req.login(user, function (err) {
            if (err) return next(err);
            // req.session.success = "Welcome back!";
            console.log("Logged In");
            console.log("Welcome back!");
            const redirectUrl = req.session.redirectTo || '/';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
            // passport.authenticate('local', {
            // 	successRedirect: '/dashboard',
            // 	failureRedirect: '/login'
            // })(req, res, next);
        });
    },

    //GET /logout
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
    }

};