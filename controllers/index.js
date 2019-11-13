const User = require('../models/users');
const Journey = require('../models/journey');
const MediaPhoto = require('../models/mediaPhoto');
const MediaVideo = require('../models/mediaVideo');
const Certificate = require('../models/certificate');
const Employee = require('../models/employee');
const Portfolio = require('../models/portfolio');
const Service = require('../models/service');
const Product = require('../models/product');
const Faq = require('../models/faq');
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

    //GET /company-dashboard/employees
    async getEmployees(req, res, next) {
        let user = req.user;
        let employee = await Employee.find().where("owner.id").equals(user._id).exec();
        res.render('businesses/employees', { title: 'Dashboard | Employees', user, employee });
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

    // Delete Certificate
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
    async getFaq(req, res, next) {
        let user = req.user;
        let faq = await Faq.find().where("owner.id").equals(user._id).exec();
        res.render('businesses/faq', { title: 'Dashboard | FAQ', faq });
    },

    //GET /company-dashboard/media
    async getMedia(req, res, next) {
        let user = req.user;
        let mediaPhoto = await MediaPhoto.find().where("owner.id").equals(user._id).exec();
        let mediaVideo = await MediaVideo.find().where("owner.id").equals(user._id).exec();
        res.render('businesses/media', { title: 'Dashboard | Media', mediaPhoto, mediaVideo });
    },

    //Create mediaPhoto
    async postMediaPhoto(req, res, next) {
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        let image = await cloudinary.v2.uploader.upload(req.file.path);

        const newMediaPhoto = new MediaPhoto({
            title: req.body.title,
            owner: owner,
            description: req.body.description,
            imageUrl: image.secure_url,
            imageId: image.public_id
        });

        // save the updated journey into the db
        let mediaPhoto = await MediaPhoto.create(newMediaPhoto);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Photo successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/media");
    },

    //Edit Media Photo
    async putMediaPhoto(req, res, next) {
        let mediaPhoto = await MediaPhoto.findById(req.params.id);
        const {
            title,
            description,
        } = req.body;

        if (title) mediaPhoto.title = req.body.title;
        if (description) mediaPhoto.description = req.body.description;

        await mediaPhoto.save();
        req.session.success = "Media Photo successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/media");
    },

    //Delete Media Photo
    async deleteMediaPhoto(req, res, next) {
        let mediaPhoto = await MediaPhoto.findById(req.params.id);
        await cloudinary.v2.uploader.destroy(mediaPhoto.imageId);
        await mediaPhoto.remove();
        req.session.error = "Media Photo Deleted!";
        res.redirect("/company-dashboard/media");
    },

    //Create mediaVideo
    async postMediaVideo(req, res, next) {
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        let video = await cloudinary.v2.uploader.upload(req.file.path,
            {
                resource_type: "video",
                chunk_size: 6000000,
                eager: [
                    { audio_codec: "aac" }],
                eager_async: true
            });

        const newMediaVideo = new MediaVideo({
            title: req.body.title,
            owner: owner,
            description: req.body.description,
            videoUrl: video.secure_url,
            videoId: video.public_id
        });

        let mediaVideo = await MediaVideo.create(newMediaVideo);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Video successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/media");
    },

    //Edit Media Video
    async putMediaVideo(req, res, next) {
        let mediaVideo = await MediaVideo.findById(req.params.id);
        const {
            title,
            description,
        } = req.body;

        if (title) mediaVideo.title = req.body.title;
        if (description) mediaVideo.description = req.body.description;

        await mediaVideo.save();
        req.session.success = "Media Video successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/media");
    },

    //Delete Media Video
    async deleteMediaVideo(req, res, next) {
        let mediaVideo = await MediaVideo.findById(req.params.id);
        await cloudinary.v2.uploader.destroy(mediaVideo.videoId);
        await mediaVideo.remove();
        req.session.error = "Media Video Deleted!";
        res.redirect("/company-dashboard/media");
    },

    //Create employee
    async postEmployee(req, res, next) {
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        let image = await cloudinary.v2.uploader.upload(req.file.path);

        const newEmployee = new Employee({
            name: req.body.name,
            owner: owner,
            position: req.body.position,
            description: req.body.description,
            imageUrl: image.secure_url,
            imageId: image.public_id
        });

        // save the updated journey into the db
        let employee = await Employee.create(newEmployee);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Employee successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/employees");
    },

    //Edit Employee
    async putEmployee(req, res, next) {
        let employee = await Employee.findById(req.params.id);
        if (req.file) {
            await cloudinary.v2.uploader.destroy(employee.imageId);
            // upload image
            let image = await cloudinary.v2.uploader.upload(req.file.path);
            // add images to post.images array
            employee.imageUrl = image.secure_url;
            employee.imageId = image.public_id;
        }
        const {
            name,
            description,
            position
        } = req.body;

        if (name) employee.name = req.body.name;
        if (position) employee.position = req.body.position;
        if (description) employee.description = req.body.description;

        await employee.save();
        req.session.success = "Employee successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/employees");
    },

    //Delete Employee
    async deleteEmployee(req, res, next) {
        let employee = await Employee.findById(req.params.id);
        await cloudinary.v2.uploader.destroy(employee.imageId);
        await employee.remove();
        req.session.error = "Employee Deleted!";
        res.redirect("/company-dashboard/employees");
    },


    //GET /company-dashboard/portfolio
    async getPortfolio(req, res, next) {
        let user = req.user;
        let portfolio = await Portfolio.find().where("owner.id").equals(user._id).exec();
        res.render('businesses/portfolio', { title: 'Dashboard | Portfolio', portfolio });
    },

    //Create portfolio
    async postPortfolio(req, res, next) {
        req.body.images = [];
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }

        const newPortfolio = new Portfolio({
            title: req.body.title,
            owner: owner,
            category: req.body.category,
            description: req.body.description,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            budget: req.body.budget,
            teamMembers: req.body.teamMembers,
            products: req.body.products,
            images: req.body.images,
            expertise: req.body.expertise
        });

        // save the updated journey into the db
        let portfolio = await Portfolio.create(newPortfolio);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Portfolio successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/portfolio");
    },

    //Edit Portfolio
    async putPortfolio(req, res, next) {
        let portfolio = await Portfolio.findById(req.params.id);

        if (req.body.deleteImages && req.body.deleteImages.length) {
            // assign deleteImages from req.body to its own variable
            let deleteImages = req.body.deleteImages;
            // loop over deleteImages
            for (const public_id of deleteImages) {
                // delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // delete image from post.images
                for (const image of portfolio.images) {
                    if (image.public_id === public_id) {
                        let index = portfolio.images.indexOf(image);
                        portfolio.images.splice(index, 1);
                    }
                }
            }
        }

        // check if there are any new images for upload
        if (req.files) {
            // upload images
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                // add images to post.images array
                portfolio.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }

        const {
            title,
            category,
            description,
            startTime,
            endTime,
            budget,
            teamMembers,
            products,
            expertise
        } = req.body;

        if (title) portfolio.title = req.body.title;
        if (category) portfolio.category = req.body.category;
        if (description) portfolio.description = req.body.description;
        if (startTime) portfolio.startTime = req.body.startTime;
        if (endTime) portfolio.endTime = req.body.endTime;
        if (budget) portfolio.budget = req.body.budget;
        if (teamMembers) portfolio.teamMembers = req.body.teamMembers;
        if (products) portfolio.products = req.body.products;
        if (expertise) portfolio.expertise = req.body.expertise;

        await portfolio.save();
        req.session.success = "Portfolio successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/portfolio");
    },

    //Delete Portfolio
    async deletePortfolio(req, res, next) {
        let portfolio = await Portfolio.findById(req.params.id);
        for (const public_id of portfolio.images) {
            // delete images from cloudinary
            await cloudinary.v2.uploader.destroy(public_id);
        }

        await portfolio.remove();
        req.session.error = "Portfolio Deleted!";
        res.redirect("/company-dashboard/portfolio");
    },

    //GET /company-dashboard/products
    async getProducts(req, res, next) {
        let user = req.user;
        let product = await Product.find().where("owner.id").equals(user._id).exec();
        res.render('businesses/products', { title: 'Dashboard | Products', product });
    },

    //GET /company-dashboard/reviews
    getReviews(req, res, next) {
        let user = req.user;
        res.render('businesses/reviews', { title: 'Dashboard | Reviews' });
    },

    //GET /company-dashboard/services
    async getServices(req, res, next) {
        let user = req.user;
        let service = await Service.find().where("owner.id").equals(user._id).exec();
        res.render('businesses/services', { title: 'Dashboard | Services', service });
    },

    //Create service
    async postService(req, res, next) {
        req.body.images = [];
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }

        const newService = new Service({
            title: req.body.title,
            owner: owner,
            category: req.body.category,
            serviceType: req.body.service,
            description: req.body.description,
            time: req.body.time,
            budget: req.body.budget,
            teamMembers: req.body.teamMembers,
            products: req.body.products,
            images: req.body.images,
            priceTo: req.body.priceTo,
            priceFrom: req.body.priceFrom,
            priceInfo: req.body.priceInfo,
            teamInfo: req.body.teamInfo,
        });

        // save the updated journey into the db
        let service = await Service.create(newService);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Service successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/services");
    },

    //Edit Service
    async putService(req, res, next) {
        let service = await Service.findById(req.params.id);

        if (req.body.deleteImages && req.body.deleteImages.length) {
            // assign deleteImages from req.body to its own variable
            let deleteImages = req.body.deleteImages;
            // loop over deleteImages
            for (const public_id of deleteImages) {
                // delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // delete image from post.images
                for (const image of service.images) {
                    if (image.public_id === public_id) {
                        let index = service.images.indexOf(image);
                        service.images.splice(index, 1);
                    }
                }
            }
        }

        // check if there are any new images for upload
        if (req.files) {
            // upload images
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                // add images to post.images array
                service.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }

        const {
            title,
            category,
            serviceType,
            description,
            time,
            budget,
            teamMembers,
            products,
            priceTo,
            priceFrom,
            priceInfo,
            teamInfo,
        } = req.body;

        if (title) service.title = req.body.title;
        if (category) service.category = req.body.category;
        if (description) service.description = req.body.description;
        if (serviceType) service.serviceType = req.body.serviceType;
        if (priceTo) service.priceTo = req.body.priceTo;
        if (priceFrom) service.priceFrom = req.body.priceFrom;
        if (budget) service.budget = req.body.budget;
        if (teamMembers) service.teamMembers = req.body.teamMembers;
        if (products) service.products = req.body.products;
        if (teamInfo) service.teamInfo = req.body.teamInfo;
        if (priceInfo) service.priceInfo = req.body.priceInfo;
        if (time) service.time = req.body.time;

        await service.save();
        req.session.success = "Service successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/services");
    },

    //Delete Service
    async deleteService(req, res, next) {
        let service = await Service.findById(req.params.id);
        for (const public_id of service.images) {
            // delete images from cloudinary
            await cloudinary.v2.uploader.destroy(public_id);
        }
        await service.remove();
        req.session.error = "Service Deleted!";
        res.redirect("/company-dashboard/services");
    },

    //Create product
    async postProduct(req, res, next) {
        req.body.images = [];
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }

        const newProduct = new Product({
            price: req.body.price,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            images: req.body.images,
            owner: owner,
            time: req.body.time,
            tags: req.body.tags,
            specificationTitle: req.body.specificationTitle,
            specificationDescription: req.body.specificationDescription,
            deliveryInfo: req.body.deliveryInfo
        });

        // save the updated journey into the db
        let product = await Product.create(newProduct);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Product successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/products");
    },

    //Edit Product
    async putProduct(req, res, next) {
        let product = await Product.findById(req.params.id);

        if (req.body.deleteImages && req.body.deleteImages.length) {
            // assign deleteImages from req.body to its own variable
            let deleteImages = req.body.deleteImages;
            // loop over deleteImages
            for (const public_id of deleteImages) {
                // delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // delete image from post.images
                for (const image of product.images) {
                    if (image.public_id === public_id) {
                        let index = product.images.indexOf(image);
                        product.images.splice(index, 1);
                    }
                }
            }
        }

        // check if there are any new images for upload
        if (req.files) {
            // upload images
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                // add images to post.images array
                product.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }

        const {
            price,
            title,
            category,
            description,
            time,
            tags,
            specificationTitle,
            specificationDescription,
            deliveryInfo
        } = req.body;

        if (title) product.title = req.body.title;
        if (category) product.category = req.body.category;
        if (description) product.description = req.body.description;
        if (price) product.price = req.body.price;
        if (tags) product.tags = req.body.tags;
        if (specificationTitle) product.specificationTitle = req.body.specificationTitle;
        if (specificationDescription) product.specificationDescription = req.body.specificationDescription;
        if (deliveryInfo) product.deliveryInfo = req.body.deliveryInfo;
        if (time) product.time = req.body.time;

        await product.save();
        req.session.success = "Product successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/products");
    },

    //Delete Product
    async deleteProduct(req, res, next) {
        let product = await Product.findById(req.params.id);
        for (const public_id of product.images) {
            // delete images from cloudinary
            await cloudinary.v2.uploader.destroy(public_id);
        }
        await product.remove();
        req.session.error = "Product Deleted!";
        res.redirect("/company-dashboard/products");
    },

    //Create Faq
    async postFaq(req, res, next) {
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }

        const newFaq = new Faq({
            question: req.body.question,
            answer: req.body.answer,
            owner: owner
        });

        // save the updated journey into the db
        let faq = await Faq.create(newFaq);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Faq successfully added!";
        // redirect to show page
        res.redirect("/company-dashboard/faq");
    },

    //Edit Faq
    async putFaq(req, res, next) {
        let faq = await Faq.findById(req.params.id);

        const {
            question,
            answer,
        } = req.body;

        if (question) faq.question = req.body.question;
        if (answer) faq.answer = req.body.answer;

        await faq.save();
        req.session.success = "Faq successfully Updated!";
        // redirect to show page
        res.redirect("/company-dashboard/faq");
    },

    //Delete Faq
    async deleteFaq(req, res, next) {
        let faq = await Faq.findById(req.params.id);
        await faq.remove();
        req.session.error = "Faq Deleted!";
        res.redirect("/company-dashboard/faq");
    },


};