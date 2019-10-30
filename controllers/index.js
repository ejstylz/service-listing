const User = require('../models/users');
const passport = require('passport');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const multer = require('multer');
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'theo7',
    api_key: '167928778497466',
    api_secret: process.env.CLOUDINARY_SECRET
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    //GET /company-sign-up
    getCompanySignUp(req, res, next) {
        res.render('visitors/company-sign-up1', { title: 'Company Sign Up' });
    },

    async postCompanySignUp(req, res, next) {
        let image = await cloudinary.v2.uploader.upload(req.file.path);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            country: req.body.country,
            phoneNumber: req.body.phoneNumber,
            profilePicture: image.secure_url,
            profilePictureId: image.public_id
        });

        let user = await User.register(newUser, req.body.password);
        req.login(user, function (err) {
            if (err) return next(err);
            // req.session.success = "User Registered";
            console.log("USER REGISTERED!");
            res.redirect('/company-sign-up2');
        });
    },

    //GET /company-sign-up2
    getCompanySignUp2(req, res, next) {
        res.render('visitors/company-sign-up2', { title: 'Company Sign Up' });
    },

    async postCompanySignUp2(req, res, next) {
        let image = await cloudinary.v2.uploader.upload(req.file.path);
        const user = req.user;
        user.logo = image.secure_url;
        user.logoId = image.public_id;
        user.about = req.body.about;
        user.service = req.body.service;
        user.serviceCategory = req.body.serviceCategory;
        await user.save();
        console.log("USER REGISTERED!");
        res.redirect('/company-sign-up3');

    },

    //GET /company-sign-up3
    getCompanySignUp3(req, res, next) {
        res.render('visitors/company-sign-up3', { title: 'Company Sign Up' });
    },

    //GET /company-sign-up4
    getCompanySignUp4(req, res, next) {
        res.render('visitors/company-sign-up4', { title: 'Company Sign Up' });
    },

    async postCompanySignUp4(req, res, next) {

        const token = await crypto.randomBytes(20).toString('hex');

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // req.session.error = 'No account with that email address exists.';
            console.log("no user");
            return res.redirect('/company-sign-up4');
        }

        user.verifyToken = token;
        user.verifyTokenExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const msg = {
            to: user.email,
            from: 'Gabazzo <besthands7777@gmail.com>',
            subject: 'Gabazzo - Verify Email',
            text: `You are receiving this because you (or someone else) have requested to verify your email for account with Username: ${user.username}.
				Please click on the following link, or copy and paste it into your browser to complete the process:
				http://${req.headers.host}/verify/${token}
				If you did not request this, please ignore this email and your password will remain unchanged.`.replace(/				/g, ''),
        };

        await sgMail.send(msg);

        // req.session.success = `An e-mail has been sent to ${user.email} with further instructions. Check in your spam folder also`;
        console.log("Email sent!");
        res.redirect('/company-sign-up4');

    },

    // GET /verify
    async getVerify(req, res, next) {
        const { token } = req.params;
        const user = await User.findOne({ verifyToken: token, verifyTokenExpires: { $gt: Date.now() } });
        user.isEmailVerified = true;
        user.verifyToken = null;
        user.verifyTokenExpires = null;
        await user.save();


        const msg = {
            to: user.email,
            from: 'Gabazzo <besthands7777@gmail.com>',
            subject: 'Gabazzo - Verified',
            text: `Hello,
			  This email is to confirm that you have successfully verified your email account.`.replace(/		  	/g, '')
        };

        await sgMail.send(msg);

        console.log("VERIFIED");
        // req.session.success = 'Password successfully updated!';
        res.redirect('/company-sign-up4');
    },

    //GET /company-sign-up5
    getCompanySignUp5(req, res, next) {
        res.render('visitors/company-sign-up5', { title: 'Company Sign Up' });
    },

    //GET /dashboard
    getCompanyDashboard(req, res, next) {
        res.render('businesses/dashboard', { title: 'Company Dashboard' });
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