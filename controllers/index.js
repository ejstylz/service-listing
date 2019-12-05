const User = require('../models/users');
const Journey = require('../models/journey');
const MediaPhoto = require('../models/mediaPhoto');
const MediaVideo = require('../models/mediaVideo');
const Certificate = require('../models/certificate');
const Employee = require('../models/employee');
const Portfolio = require('../models/portfolio');
const Review = require('../models/review');
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

    //GET /
    async getHomePage(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find();
        res.render('index', { title: 'GABAZZO', user, company });
    },

    search(req, res, next) {
        let search = req.body.service;
        if (search === "Roofing Services") {
            res.redirect("/services/roofing-services");
        } else if (search === "Landscaping Services") {
            res.redirect("/services/landscaping-services");
        } else if (search === "Paving Services") {
            res.redirect("/services/paving-services");
        } else if (search === "Fencing Services") {
            res.redirect("/services/fencing-services")
        } else if (search === "Junk Removal") {
            res.redirect("/services/junk-removal")
        } else if (search === "General Siding") {
            res.redirect("/services/general-siding")
        } else if (search === "Exterior Painting") {
            res.redirect("/services/exterior-painting")
        } else if (search === "Garage Services") {
            res.redirect("/services/garage-services")
        } else if (search === "Pools, Spas and Hot Tubs") {
            res.redirect("/services/pools-hot-tubes-spas")
        } else if (search === "Masonry Services") {
            res.redirect("/services/masonry-services")
        } else if (search === "Plumbing Services") {
            res.redirect("/services/plumbing-services")
        } else if (search === "HVAC Services") {
            res.redirect("/services/hvac-services")
        } else if (search === "Dry Wall & Insulation") {
            res.redirect("/services/drywall-and-insulation")
        } else if (search === "Pest Control") {
            res.redirect("/services/pest-control")
        } else if (search === "General Cleaning") {
            res.redirect("/services/general-cleaning")
        } else if (search === "Interior Painting") {
            res.redirect("/services/interior-painting")
        } else if (search === "Window & Door Services") {
            res.redirect("/services/window-and-door-services")
        } else if (search === "Flooring Services") {
            res.redirect("/services/flooring-services")
        } else if (search === "General Remodeling") {
            res.redirect("/services/general-remodeling")
        } else if (search === "Carpenters Services") {
            res.redirect("/services/carpenters-services")
        } else if (search === "Towing Services") {
            res.redirect("/services/towing-services")
        } else if (search === "Oil & Fluid Exchange") {
            res.redirect("/services/oil-and-fluid-exchange")
        } else if (search === "Body Shop") {
            res.redirect("/services/body-shop")
        } else if (search === "Mufflers & Exhaust Services") {
            res.redirect("/services/mufflers-and-exhaust")
        } else if (search === "Suspension Services") {
            res.redirect("/services/suspension-services")
        } else if (search === "Brake Change") {
            res.redirect("/services/brake-change")
        } else if (search === "Alarm Installation") {
            res.redirect("/services/alarm-installation")
        } else if (search === "Engine Diagnostic Services") {
            res.redirect("/services/engine-diagnostic")
        } else if (search === "Heating & Cooling") {
            res.redirect("/services/heating-and-cooling")
        } else if (search === "Wheel & Tire Services") {
            res.redirect("/services/wheel-and-tire")
        } else if (search === "Check Engine Light") {
            res.redirect("/services/check-engine-light")
        } else if (search === "Battery Services") {
            res.redirect("/services/battery-services")
        } else if (search === "Window Tinting") {
            res.redirect("/services/window-tinting")
        } else if (search === "Fleet Services") {
            res.redirect("/services/fleet-services")
        } else if (search === "General Handyman") {
            res.redirect("/services/general-handyman")
        } else if (search === "General Contractor") {
            res.redirect("/services/general-contractor")
        } else if (search === "Electrical Services") {
            res.redirect("/services/electrical-services")
        } else if (search === "Moving Services") {
            res.redirect("/services/moving-services")
        } else if (search === "Building Security") {
            res.redirect("/services/building-security")
        } else if (search === "Demolition Services") {
            res.redirect("/services/demolition-services")
        } else if (search === "Appliance Repairs & Installation") {
            res.redirect("/services/appliance-repairs")
        } else if (search === "Locksmith Services") {
            res.redirect("/services/locksmith-services")
        } else {
            res.redirect("back")
        }
    },

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
                template_id: "d-b8b55998c9294122933903d622cedb77",
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
                query: req.body.location + req.body.city + req.body.state,
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
            template_id: "d-b8b55998c9294122933903d622cedb77",
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
        console.log(req.file);

        // check if location was updated
        if (req.body.location && req.body.location !== user.location) {
            let response = await geocodingClient
                .forwardGeocode({
                    query: req.body.location + req.body.city + req.body.state,
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
            template_id: "d-09713efe713d4e4b97fb7fbff3f54708",
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

    //GET /dashboard
    getMemberProfile(req, res, next) {
        let member = req.user;
        let percentage = 0;
        if (member.isEmailVerified || member.isFacebookVerified) {
            percentage = 50;
        } else if (member.isEmailVerified && member.isFacebookVerified) {
            percentage = 100;
        }
        res.render('members/profile', { title: 'Your Profile', member, percentage });
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
        if (purpose) user.Purpose = req.body.purpose;

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
    async getReviews(req, res, next) {
        let user = req.user;
        let review = await Review.find().where("owner.id").equals(user._id).exec();
        function calculateAverage(reviews) {
            if (review.length === 0) {
                return 0;
            }
            var sum = 0;
            review.forEach(function (element) {
                sum += element.rating;
            });
            return sum / review.length;
        }
        let average = calculateAverage(review);
        res.render('businesses/reviews', { title: 'Dashboard | Reviews', review, average });
    },

    //Reply Review
    async reviewReply(req, res, next) {
        let review = await Review.findById(req.params.id);

        const {
            reply
        } = req.body;

        if (reply) review.reply = req.body.reply;

        await review.save();
        req.session.success = "Reply Successful";
        // redirect to show page
        res.redirect("back");
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

    async companyProfileShow(req, res, next) {
        let company = await User.findById(req.params.id);
        let service = await Service.find().where("owner.id").equals(company._id).exec();
        let mediaPhoto = await MediaPhoto.find().where("owner.id").equals(company._id).exec();
        res.render('show-pages/company-profile', { title: 'Company Profile', company, service, mediaPhoto });
    },

    async companyContact(req, res, next) {
        let company = await User.findById(req.params.id);
        const msg = {
            to: company.email,
            from: 'GABAZZO <no-reply@gbazzo.com>',
            subject: 'GABAZZO Contact Form',
            text: `First Name: ${req.body.firstName}
                   Last Name: ${req.body.lastName}
                   Email: ${req.body.email}
                   Phone Number: ${req.body.phone}
                   Reason For Contact: ${req.body.reason}
                   Address: ${req.body.address}
                   Comment: ${req.body.comment}`.replace(/				/g, ''),
        };

        await sgMail.send(msg);

        req.session.success = `Email Sent`;
        res.redirect('back');
    },

    async companyProfileAbout(req, res, next) {
        let company = await User.findById(req.params.id);
        let journey = await Journey.find().where("owner.id").equals(company._id).exec();
        let certificate = await Certificate.find().where("owner.id").equals(company._id).exec();
        let mediaPhoto = await MediaPhoto.find().where("owner.id").equals(company._id).exec();
        res.render('show-pages/about', { title: 'Company Profile', company, journey, certificate, mediaPhoto });
    },

    async companyProfileMedia(req, res, next) {
        let company = await User.findById(req.params.id);
        let photo = await MediaPhoto.find().where("owner.id").equals(company._id).exec();
        let video = await MediaVideo.find().where("owner.id").equals(company._id).exec();
        res.render('show-pages/media', { title: 'Company Profile', company, photo, video });
    },

    async companyProfileEmployee(req, res, next) {
        let company = await User.findById(req.params.id);
        let employee = await Employee.find().where("owner.id").equals(company._id).exec();
        res.render('show-pages/employees', { title: 'Company Profile', company, employee });
    },

    async companyProfilePortfolio(req, res, next) {
        let company = await User.findById(req.params.id);
        let portfolio = await Portfolio.find().where("owner.id").equals(company._id).exec();
        res.render('show-pages/portfolio', { title: 'Company Profile', company, portfolio });
    },

    async companyProfileServices(req, res, next) {
        let company = await User.findById(req.params.id);
        let product = await Product.find().where("owner.id").equals(company._id).exec();
        let service = await Service.find().where("owner.id").equals(company._id).exec();
        res.render('show-pages/services-products', { title: 'Company Profile', company, product, service });
    },

    async companyProfileReviews(req, res, next) {
        let company = await User.findById(req.params.id);
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        let fiveReview = [];
        let fourReview = [];
        let threeReview = [];
        let twoReview = [];
        let oneReview = [];
        await review.forEach(function (review) {
            if (review.rating === 5) {
                fiveReview.push(review)
            }
            if (review.rating === 4) {
                fourReview.push(review)
            }
            if (review.rating === 3) {
                threeReview.push(review)
            }
            if (review.rating === 2) {
                twoReview.push(review)
            }
            if (review.rating === 1) {
                oneReview.push(review)
            }
        });
        function calculateAverage(reviews) {
            if (review.length === 0) {
                return 0;
            }
            var sum = 0;
            review.forEach(function (element) {
                sum += element.rating;
            });
            return sum / review.length;
        }
        let average = calculateAverage(review);
        res.render('show-pages/reviews',
            {
                title: 'Company Profile',
                review,
                company,
                average,
                fiveReview,
                fourReview,
                threeReview,
                twoReview,
                oneReview
            });
    },

    //Create Review
    async createReview(req, res, next) {
        req.body.images = [];
        // find the user
        const user = req.user;
        const company = await User.findById(req.params.id);
        const owner = {
            id: company._id,
            username: company.username
        }
        const author = {
            id: user._id,
            username: user.username
        }

        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }

        const newReview = new Review({
            text: req.body.text,
            author: author,
            rating: req.body.rating,
            owner: owner,
            images: req.body.images,
        });

        // save the updated journey into the db
        let review = await Review.create(newReview);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log(review);
        req.session.success = "Review successfully created!";
        // redirect to show page
        res.redirect("back");
    },

    async serviceDetails(req, res, next) {
        let service = await Service.findById(req.params.id);
        let company = await User.findById(service.owner.id);
        let otherServices = await Service.find().where("owner.id").equals(company).exec();
        res.render('show-pages/service-details', { title: 'Company Profile', service, company, otherServices });
    },

    async productDetails(req, res, next) {
        let product = await Product.findById(req.params.id);
        let company = await User.findById(product.owner.id);
        let otherProducts = await Product.find().where("owner.id").equals(company).exec();
        res.render('show-pages/product-details', { title: 'Company Profile', product, company, otherProducts });
    },

    async companyProfileFaq(req, res, next) {
        let company = await User.findById(req.params.id);
        let faq = await Faq.find().where("owner.id").equals(company._id).exec();
        res.render('show-pages/faq', { title: 'Company Profile', company, faq });
    },


    //Services Pages Controllers

    async garageServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Garage services").exec();
        res.render('show-pages/garage-services', { title: 'Company Profile', user, company });
    },

    async roofingServies(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Roofing Services").exec();
        res.render('show-pages/roofing-services', { title: 'Company Profile', user, company });
    },

    async landscapingServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Landscaping services").exec();
        res.render('show-pages/landscaping-services', { title: 'Company Profile', user, company });
    },

    async pavingServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Paving services").exec();
        res.render('show-pages/paving-services', { title: 'Company Profile', user, company });
    },

    async fencingServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Fencing services").exec();
        res.render('show-pages/fencing-services', { title: 'Company Profile', user, company });
    },

    async junkRemoval(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Junk Removal").exec();
        res.render('show-pages/junk-removal', { title: 'Company Profile', user, company });
    },

    async generalSiding(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("General Siding").exec();
        res.render('show-pages/general-siding', { title: 'Company Profile', user, company });
    },

    async exteriorPainting(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Exterior Painting").exec();
        res.render('show-pages/exterior-painting', { title: 'Company Profile', user, company });
    },

    async poolsSpas(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Pools, Spas and Hot Tubs").exec();
        res.render('show-pages/pools-hot-tubes-spas', { title: 'Company Profile', user, company });
    },

    async masonryServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Masonry services").exec();
        res.render('show-pages/masonry-services', { title: 'Company Profile', user, company });
    },

    async plumbingServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Plumbing Services").exec();
        res.render('show-pages/plumbing-services', { title: 'Company Profile', user, company });
    },

    async hvacServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("HVAC Services").exec();
        res.render('show-pages/hvac-services', { title: 'Company Profile', user, company });
    },

    async dryWallAndInsulation(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Dry Wall & Insulation").exec();
        res.render('show-pages/drywall-and-insulation', { title: 'Company Profile', user, company });
    },

    async pestControl(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Pest Control").exec();
        res.render('show-pages/pest-control', { title: 'Company Profile', user, company });
    },

    async generalCleaning(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("General cleaning").exec();
        res.render('show-pages/general-cleaning', { title: 'Company Profile', user, company });
    },

    async interiorPainting(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Interior Painting").exec();
        res.render('show-pages/interior-painting', { title: 'Company Profile', user, company });
    },

    async windowDoorServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Window & Door Services").exec();
        res.render('show-pages/window-and-door-services', { title: 'Company Profile', user, company });
    },

    async flooringServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Flooring Services").exec();
        res.render('show-pages/flooring-services', { title: 'Company Profile', user, company });
    },

    async generalRemodeling(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("General Remodeling").exec();
        res.render('show-pages/general-remodeling', { title: 'Company Profile', user, company });
    },

    async carpentersServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Carpenters Services").exec();
        res.render('show-pages/carpenters-services', { title: 'Company Profile', user, company });
    },

    async towingServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Towing Services").exec();
        res.render('show-pages/towing-services', { title: 'Company Profile', user, company });
    },

    async oilAndFluidExchange(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Oil & Fluid Exchange").exec();
        res.render('show-pages/oil-and-fluid-exchange', { title: 'Company Profile', user, company });
    },

    async bodyShop(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Body Shop").exec();
        res.render('show-pages/body-shop', { title: 'Company Profile', user, company });
    },

    async mufflersAndExhaust(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Mufflers & Exhaust Services").exec();
        res.render('show-pages/mufflers-and-exhaust', { title: 'Company Profile', user, company });
    },

    async suspensionServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Suspension Services").exec();
        res.render('show-pages/suspension-services', { title: 'Company Profile', user, company });
    },

    async brakeChange(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Brake Change").exec();
        res.render('show-pages/brake-change', { title: 'Company Profile', user, company });
    },

    async alarmInstallation(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Alarm Installation").exec();
        res.render('show-pages/alarm-installation', { title: 'Company Profile', user, company });
    },

    async engineDiagnostic(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Engine Diagnostic Services").exec();
        res.render('show-pages/engine-diagnostic', { title: 'Company Profile', user, company });
    },

    async heatingAndCooling(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Heating & Cooling").exec();
        res.render('show-pages/heating-and-cooling', { title: 'Company Profile', user, company });
    },

    async wheelAndTire(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Wheel & Tire Services").exec();
        res.render('show-pages/wheel-and-tire', { title: 'Company Profile', user, company });
    },

    async checkEngineLight(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Check Engine Light").exec();
        res.render('show-pages/check-engine-light', { title: 'Company Profile', user, company });
    },

    async batteryServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Battery Services").exec();
        res.render('show-pages/battery-services', { title: 'Company Profile', user, company });
    },

    async windowTinting(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Window Tinting").exec();
        res.render('show-pages/window-tinting', { title: 'Company Profile', user, company });
    },

    async generalHandyman(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("General Handyman").exec();
        res.render('show-pages/general-handyman', { title: 'Company Profile', user, company });
    },

    async generalContractor(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("General Contractor").exec();
        res.render('show-pages/general-contractor', { title: 'Company Profile', user, company });
    },

    async electricalServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Electrical Services").exec();
        res.render('show-pages/electrical-services', { title: 'Company Profile', user, company });
    },

    async movingServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Moving Services").exec();
        res.render('show-pages/moving-services', { title: 'Company Profile', user, company });
    },

    async buildingSecurity(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Building Security").exec();
        res.render('show-pages/building-security', { title: 'Company Profile', user, company });
    },

    async demolitionServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Demolition Services").exec();
        res.render('show-pages/demolition-services', { title: 'Company Profile', user, company });
    },

    async applianceRepairs(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Appliance Repairs & Installation").exec();
        res.render('show-pages/appliance-repairs', { title: 'Company Profile', user, company });
    },

    async locksmithServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Locksmith Services").exec();
        res.render('show-pages/locksmith-services', { title: 'Company Profile', user, company });
    },

    async fleetServices(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("serviceCategory").equals("Fleet Services").exec();
        res.render('show-pages/fleet-services', { title: 'Company Profile', user, company });
    },

    // GET /forgot-password
    getForgotPw(req, res, next) {
        res.render('visitors/forgot');
    },

    //PUT /forgot-password
    async putForgotPw(req, res, next) {
        const token = await crypto.randomBytes(20).toString('hex');

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            req.session.error = 'No account with that email address exists.';
            return res.redirect('/forgot-password');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const msg = {
            to: user.email,
            from: 'GABAZZO <no-reply@gabazzo.com>',
            subject: 'GABAZZO - Forgot Password / Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account with Username: ${user.username}.
				Please click on the following link, or copy and paste it into your browser to complete the process:
				http://${req.headers.host}/reset/${token}
				If you did not request this, please ignore this email and your password will remain unchanged.`.replace(/				/g, ''),
        };

        await sgMail.send(msg);

        req.session.success = `An e-mail has been sent to ${user.email} with further instructions. Check in your spam folder also`;
        res.redirect('/forgot-password');
    },

    //GET /reset
    async getReset(req, res, next) {
        const { token } = req.params;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
        if (!user) {
            req.session.error = 'Password reset token is invalid or has expired.';
            return res.redirect('/forgot-password');
        }
        res.render('visitors/reset', { token });
    },

    // PUT /reset
    async putReset(req, res, next) {
        const { token } = req.params;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            req.session.error = 'Password reset token is invalid or has expired.';
            return res.redirect(`/reset/${token}`);
        }

        if (req.body.password === req.body.confirm) {
            await user.setPassword(req.body.password);
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();
            const login = util.promisify(req.login.bind(req));
            await login(user);
        } else {
            req.session.error = 'Passwords do not match.';
            return res.redirect(`/reset/${token}`);
        }

        const msg = {
            to: user.email,
            from: 'GABAZZO <no-reply@gabazzo.com>',
            subject: 'GABAZZO - Password Changed',
            text: `Hello, This email is to confirm that the password for your account has just been changed.
			  If you did not make this change, please hit reply and notify us at once.`.replace(/		  	/g, '')
        };

        await sgMail.send(msg);

        if (!user.isCompany) {
            res.redirect('/');
        } else {
            res.redirect('/company-dashboard');
        }
    },


};