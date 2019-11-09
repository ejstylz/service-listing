const User = require('../models/users');
const Journey = require('../models/journey');
const Certificate = require('../models/certificate');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const passport = require('passport');
const crypto = require('crypto');
const util = require('util');
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

    //GET /become-a-seller-overview
    getSellerOverview(req, res, next) {
        res.render('visitors/become-a-seller-overview', { title: 'Seller Overview' });
    },

    //GET /become-a-seller-overview-do
    getSellerDo(req, res, next) {
        res.render('visitors/become-a-seller-overview-do', { title: 'Seller Overview' });
    },

    //GET /become-a-seller-overview-do-not
    getSellerDoNot(req, res, next) {
        res.render('visitors/become-a-seller-overview-do-not', { title: 'Seller Overview' });
    },

    //GET /become-a-seller-overview2
    getSellerOverview2(req, res, next) {
        res.render('visitors/become-a-seller-overview2', { title: 'Seller Overview' });
    },


    //GET /sign-up
    getSignup(req, res, next) {
        res.render('visitors/sign-up', { title: 'Sign Up' });
    },

    //POST /sign-up
    async postSignUp(req, res, next) {
        const token = await crypto.randomBytes(20).toString('hex');

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            verifyToken: token,
            verifyTokenExpires: Date.now() + 3600000 // 1 hour
        });


        let user = await User.register(newUser, req.body.password);
        req.login(user, async function (err) {
            if (err) return next(err);

            const msg = {
                to: user.email,
                from: 'Gabazzo <no-reply@gabazzo.com>',
                subject: 'Gabazzo - Verify Email',
                template_id: "d-444d5c30c5a242af8a7d74df878df922",
                dynamic_template_data: {
                    username: user.username,
                    verify_link: `http://${req.headers.host}/verify/${token}`
                }
            };

            await sgMail.send(msg);
            req.session.success = `An Email has been sent to ${user.email} Kindly verify your email.`;
            console.log("Email sent!");
            // req.session.success = "User Registered";
            // console.log("USER REGISTERED!");
            res.redirect('/');
        });
    },

    //GET /company-sign-up
    getCompanySignUp(req, res, next) {
        res.render('visitors/company-sign-up1', { title: 'Company Sign Up' });
    },

    async postCompanySignUp(req, res, next) {
        let image = await cloudinary.v2.uploader.upload(req.file.path);
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.location,
                limit: 1
            })
            .send();

        req.body.coordinates = response.body.features[0].geometry.coordinates;
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            location: req.body.location,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            country: req.body.country,
            phoneNumber: req.body.phoneNumber,
            profilePicture: image.secure_url,
            profilePictureId: image.public_id,
            isCompany: true,
            coordinates: req.body.coordinates
        });


        let user = await User.register(newUser, req.body.password);
        req.login(user, function (err) {
            if (err) return next(err);
            // req.session.success = "Company Registered";
            // console.log(user);
            res.redirect('/company-sign-up2');
        });
    },

    //GET /company-sign-up2
    getCompanySignUp2(req, res, next) {
        res.render('visitors/company-sign-up2', { title: 'Company Sign Up' });
    },

    async postCompanySignUp2(req, res, next) {
        // req.body.filters = [];
        let image = await cloudinary.v2.uploader.upload(req.file.path);
        const user = req.user;
        user.companyName = req.body.companyName;
        user.logo = image.secure_url;
        user.logoId = image.public_id;
        user.about = req.body.about;
        user.service = req.body.service;
        user.serviceCategory = req.body.serviceCategory;
        user.filters = req.body.filters,
            user.levels = req.body.levels

        await user.save();

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

    //POST /company-sign-up4
    async postCompanySignUp4(req, res, next) {

        const token = await crypto.randomBytes(20).toString('hex');

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.session.error = 'No account with that email address exists.';
            console.log("no user");
            return res.redirect('/company-sign-up4');
        }

        user.verifyToken = token;
        user.verifyTokenExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const msg = {
            to: user.email,
            from: 'Gabazzo <no-reply@gabazzo.com>',
            subject: 'Gabazzo - Verify Email',
            template_id: "d-444d5c30c5a242af8a7d74df878df922",
            dynamic_template_data: {
                username: user.username,
                verify_link: `http://${req.headers.host}/verify/${token}`
            }
        };

        await sgMail.send(msg);

        req.session.success = `An Email has been sent to ${user.email} with further instructions.`;
        console.log("Email sent!");
        res.redirect('/company-sign-up4');

    },

    //Company Update
    async userUpdate(req, res, next) {
        // find the user by id
        const user = req.user;

        // let images = await cloudinary.v2.uploader.upload([{
        //     name: 'logo', maxCount: 1
        // }, {
        //     name: 'profilePicture', maxCount: 1
        // }]);
        console.log(req.file);

        // check if location was updated
        if (req.body.location && req.body.location !== user.location) {
            let response = await geocodingClient
                .forwardGeocode({
                    query: req.body.location,
                    limit: 1
                })
                .send();
            user.coordinates = response.body.features[0].geometry.coordinates;
            user.location = req.body.location;
        }
        // update the user with any new properties
        const {
            email,
            city,
            state,
            zipCode,
            country,
            phoneNumber,
            profilePicture,
            profilePictureId,
            logo,
            logoId,
            about,
            slogan,
            tags,
            service,
            serviceCategory,
            verifyToken,
            verifyTokenExpires,
            filters,
            levels,
            language,
            companyName,
            facebookUrl,
            twitterUrl,
            instagramUrl,
            linkedinUrl,
            pinterestUrl,
            directions,
            location,
            coordinates,
            website,
            products,
            yearsInBusiness,
            areasOfExpertise,
            serviceAreas,
            productsUsed,
            paymentMethod,
            stateLicenseTrade,
            licenseNumber,
            licenseExpiration,
            entityType,
            insuranceType,
            insuranceExpiration,
            mondayFrom,
            mondayTo,
            tuesdayFrom,
            tuesdayTo,
            wednesdayFrom,
            wednesdayTo,
            thursdayFrom,
            thursdayTo,
            fridayFrom,
            fridayTo,
            saturdayFrom,
            saturdayTo,
            sundayFrom,
            sundayTo
        } = req.body;

        if (companyName) user.companyName = companyName;
        if (email) user.email = req.body.email;
        if (city) user.city = req.body.city;
        if (state) user.state = req.body.state;
        if (zipCode) user.zipCode = req.body.zipCode;
        if (country) user.country = req.body.country;
        if (phoneNumber) user.phoneNumber = req.body.phoneNumber;
        if (about) user.about = req.body.about;
        if (slogan) user.slogan = req.body.slogan;
        if (service) user.service = req.body.service;
        if (serviceCategory) user.serviceCategory = req.body.serviceCategory;
        if (language) user.language = req.body.language;
        if (facebookUrl) user.facebookUrl = req.body.facebookUrl;
        if (twitterUrl) user.twitterUrl = req.body.twitterUrl;
        if (instagramUrl) user.instagramUrl = req.body.instagramUrl;
        if (linkedinUrl) user.linkedinUrl = req.body.linkedinUrl;
        if (pinterestUrl) user.pinterestUrl = req.body.pinterestUrl;
        if (directions) user.directions = req.body.directions;
        if (website) user.website = req.body.website;
        if (tags) user.tags = req.body.tags;
        if (yearsInBusiness) user.yearsInBusiness = req.body.yearsInBusiness;
        if (areasOfExpertise) user.areasOfExpertise = req.body.areasOfExpertise;
        if (serviceAreas) user.serviceAreas = req.body.serviceAreas;
        if (productsUsed) user.productsUsed = req.body.productsUsed;
        if (paymentMethod) user.paymentMethod = req.body.paymentMethod;
        if (stateLicenseTrade) user.stateLicenseTrade = req.body.stateLicenseTrade;
        if (licenseNumber) user.licenseNumber = req.body.licenseNumber;
        if (licenseExpiration) user.licenseExpiration = req.body.licenseExpiration;
        if (entityType) user.entityType = req.body.entityType;
        if (insuranceType) user.insuranceType = req.body.insuranceType;
        if (insuranceExpiration) user.insuranceExpiration = req.body.insuranceExpiration;
        if (mondayFrom) user.mondayFrom = req.body.mondayFrom;
        if (mondayTo) user.mondayTo = req.body.mondayTo;
        if (tuesdayFrom) user.tuesdayFrom = req.body.tuesdayFrom;
        if (tuesdayTo) user.tuesdayTo = req.body.tuesdayTo;
        if (wednesdayFrom) user.wednesdayFrom = req.body.wednesdayFrom;
        if (wednesdayTo) user.wednesdayTo = req.body.wednesdayTo;
        if (thursdayFrom) user.thursdayFrom = req.body.thursdayFrom;
        if (thursdayTo) user.thursdayTo = req.body.thursdayTo;
        if (fridayFrom) user.fridayFrom = req.body.fridayFrom;
        if (fridayTo) user.fridayTo = req.body.fridayTo;
        if (saturdayFrom) user.saturdayFrom = req.body.saturdayFrom;
        if (saturdayTo) user.saturdayTo = req.body.saturdayTo;
        if (sundayFrom) user.sundayFrom = req.body.sundayFrom;
        if (sundayTo) user.sundayTo = req.body.sundayTo;


        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Profile successfully updated!";
        req.session.success = "Profile Updated";
        // redirect to show page
        res.redirect("/company-dashboard");
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
            from: 'Gabazzo <no-reply@gabazzo.com>',
            subject: 'Gabazzo - Verified',
            template_id: "d-73fccd7c26364bdebe21cfd55fcd6993",
            dynamic_template_data: {
                username: user.username
            }
        };

        await sgMail.send(msg);

        console.log("VERIFIED");
        if (!user.isCompany) {
            req.session.success = "You have successfully verified your email account, now you can use the Gabazzo Platform for Members*";
            res.redirect("/");
        } else {
            req.session.success = "You have successfully verified your email account, now you can use the Gabazzo Platform for Companies*";
            res.redirect("/company-sign-up5");
        }
    },

    //GET /company-sign-up5
    getCompanySignUp5(req, res, next) {
        res.render('visitors/company-sign-up5', { title: 'Company Sign Up' });
    },

    //GET /dashboard
    getCompanyDashboard(req, res, next) {
        let user = req.user;
        res.render('businesses/dashboard', { title: 'Dashboard | Home', user });
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
            req.session.success = "Welcome back!";
            console.log("Logged In");
            console.log("Welcome back!");
            const redirectUrl1 = req.session.redirectTo || '/';
            const redirectUrl2 = req.session.redirectTo || '/company-dashboard';
            delete req.session.redirectTo;

            if (!user.isCompany) {
                res.redirect(redirectUrl1);
            } else {
                res.redirect(redirectUrl2);
            }
        });
    },

    //GET /logout
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
    },

    //GET /company-dashboard/employess
    getEmployees(req, res, next) {
        let user = req.user;
        res.render('businesses/employees', { title: 'Dashboard | Employees' });
    },

    //GET /company-dashboard/about
    async getAbout(req, res, next) {
        let user = await req.user;
        let journey = await Journey.find().where("owner.id").equals(user._id).exec();
        let certificate = await Certificate.find().where("owner.id").equals(user._id).exec();
        res.render('businesses/about', { title: 'Dashboard | About', user, journey, certificate });
    },

    //Put /company-dashboard/about
    async putAbout(req, res, next) {
        // find the user
        const user = req.user;

        if (req.file) {
            // upload image
            let video = await cloudinary.v2.uploader.upload(req.file.path,
                {
                    resource_type: "video",
                    chunk_size: 6000000,
                    eager: [
                        { audio_codec: "aac" }],
                    eager_async: true
                });
            // add images to post.images array
            user.videoUrl = video.secure_url;
            user.videoId = video.public_id;
        }



        const {
            about,
            purpose
        } = req.body;

        if (about) user.about = req.body.about;
        if (purpose) user.purpose = req.body.purpose;

        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Profile successfully updated!";
        req.session.success = "Profile Updated";
        // redirect to show page
        res.redirect("/company-dashboard/about");
    },

    //Create Journey
    async postJourney(req, res, next) {
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        const newJourney = new Journey({
            year: req.body.year,
            Description: req.body.description,
            owner: owner
        });

        // save the updated journey into the db
        let journey = await Journey.create(newJourney);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Journey successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/about");
    },

    //Edit Journey
    async putJourney(req, res, next) {
        let journey = await Journey.findById(req.params.id);

        const {
            year,
            Description
        } = req.body;

        if (year) journey.year = req.body.year;
        if (Description) journey.Description = req.body.Description;

        await journey.save();
        req.session.success = "Journey successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/about");
    },

    // Delete Journey
    async deleteJourney(req, res, next) {
        let journey = await Journey.findById(req.params.id);
        await journey.remove();
        req.session.error = "Journey Deleted!";
        res.redirect("/company-dashboard/about");
    },

    //Create Certificate
    async postCertificate(req, res, next) {
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        let image = await cloudinary.v2.uploader.upload(req.file.path);

        const newCertificate = new Certificate({
            title: req.body.title,
            date: req.body.date,
            owner: owner,
            description: req.body.description,
            imageUrl: image.secure_url,
            imageId: image.public_id
        });

        // save the updated journey into the db
        let certificate = await Certificate.create(newCertificate);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Journey successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/about");
    },

    //Edit Certificate
    async putCertificate(req, res, next) {
        let certificate = await Certificate.findById(req.params.id);
        if (req.file) {
            await cloudinary.v2.uploader.destroy(certificate.imageId);
            // upload image
            let image = await cloudinary.v2.uploader.upload(req.file.path);
            // add images to post.images array
            certificate.imageUrl = image.secure_url;
            certificate.imageId = image.public_id;
        }
        const {
            title,
            description,
            date
        } = req.body;

        if (date) certificate.date = req.body.date;
        if (title) certificate.title = req.body.title;
        if (description) certificate.description = req.body.description;

        await certificate.save();
        req.session.success = "Certificate successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/about");
    },

    // Delete Journey
    async deleteCertificate(req, res, next) {
        let certificate = await Certificate.findById(req.params.id);
        await cloudinary.v2.uploader.destroy(certificate.imageId);
        await certificate.remove();
        req.session.error = "Certificate Deleted!";
        res.redirect("/company-dashboard/about");
    },

    //Edit Logo
    async putLogo(req, res, next) {
        let user = req.user;
        if (req.file) {
            await cloudinary.v2.uploader.destroy(user.logoId);
            // upload image
            let logo = await cloudinary.v2.uploader.upload(req.file.path);
            // add images to post.images array
            user.logo = logo.secure_url;
            user.logoId = logo.public_id;
        }

        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Logo successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard");
    },

    //Edit Profile Picture
    async putProfilePicture(req, res, next) {
        let user = req.user;
        if (req.file) {
            await cloudinary.v2.uploader.destroy(user.profilePictureId);
            // upload image
            let picture = await cloudinary.v2.uploader.upload(req.file.path);
            // add images to post.images array
            user.profilePicture = picture.secure_url;
            user.profilePictureId = picture.public_id;
        }

        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Profile Picture successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard");
    },

    //GET /company-dashboard/faq
    getFaq(req, res, next) {
        let user = req.user;
        res.render('businesses/faq', { title: 'Dashboard | FAQ' });
    },

    //GET /company-dashboard/media
    getMedia(req, res, next) {
        let user = req.user;
        res.render('businesses/media', { title: 'Dashboard | Media' });
    },

    //GET /company-dashboard/portfolio
    getPortfolio(req, res, next) {
        let user = req.user;
        res.render('businesses/portfolio', { title: 'Dashboard | Portfolio' });
    },

    //GET /company-dashboard/products
    getProducts(req, res, next) {
        let user = req.user;
        res.render('businesses/products', { title: 'Dashboard | Products' });
    },

    //GET /company-dashboard/reviews
    getReviews(req, res, next) {
        let user = req.user;
        res.render('businesses/reviews', { title: 'Dashboard | Reviews' });
    },

    //GET /company-dashboard/services
    getServices(req, res, next) {
        let user = req.user;
        res.render('businesses/services', { title: 'Dashboard | Services' });
    },

};