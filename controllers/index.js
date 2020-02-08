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
const List = require('../models/list');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
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
        let company = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let compa = []
        company.forEach(function (comp) {
            if (company.indexOf(comp) < 5) {
                compa.push(comp);
            }
        });
        res.render('index', { title: 'GABAZZO', user, company, compa });
    },

    //GET /aboutUs
    async getAboutUs(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('about-us', { title: 'GABAZZO | About Us', user, company });
    },

    //GET blogSingle
    async getBlogSingle(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('blog-single-post', { title: 'GABAZZO | Blog Post', user, company });
    },

    //GET blog
    async getBlog(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('blog', { title: 'GABAZZO | Blog', user, company });
    },

    //GET contact-us
    async getContactUs(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('contact-us', { title: 'GABAZZO | Contact Us', user, company });
    },

    //GET cookie-policy
    async getCookiePolicy(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('cookie-policy', { title: 'GABAZZO | Cookie Policy', user, company });
    },

    //GET help-center-buyer
    async getHelpBuyer(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('help-center-buyer', { title: 'GABAZZO | Help Center', user, company });
    },

    //GET help-center-seller
    async getHelpSeller(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('help-center-seller', { title: 'GABAZZO | Help Center', user, company });
    },

    //GET how-it-works-business-owner
    async getHowBusiness(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('how-it-works-business-owner', { title: 'GABAZZO | How It Works', user, company });
    },

    //GET how-it-works-members
    async getHowMember(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('how-it-works-members', { title: 'GABAZZO | How It Works', user, company });
    },

    //GET press-and-news
    async getPress(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('press-and-news', { title: 'GABAZZO | Press & News', user, company });
    },

    //GET privacyPolicy
    async getPrivacyPolicy(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('privacy-policy', { title: 'GABAZZO | Privacy Policy', user, company });
    },

    //GET safety-buyer
    async getSafetyBuyer(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('safety-buyer', { title: 'GABAZZO | Safety-Buyer', user, company });
    },

    //GET safety-seller
    async getSafetySeller(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('safety-seller', { title: 'GABAZZO | Safety-Seller', user, company });
    },

    //GET site-map
    async getSiteMap(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('site-map', { title: 'GABAZZO | Site Map', user, company });
    },

    //GET terms
    async getTerms(req, res, next) {
        let user = await User.findById(req.user);
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        res.render('terms-and-conditions', { title: 'GABAZZO | Terms And Conditions', user, company });
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
    async getCompanySignUpHome(req, res, next) {
        let company = await User.find().where("isCompany" && "isEmailVerified").equals(true).exec();
        let compa = []
        company.forEach(function (comp) {
            if (company.indexOf(comp) < 7) {
                compa.push(comp);
            }
        });
        res.render('visitors/company-sign-up-home', { title: 'Company Sign Up', company, compa });
    },

    //GET /company-sign-up
    getCompanySignUp(req, res, next) {
        res.render('visitors/company-sign-up1', { title: 'Company Sign Up' });
    },

    async postCompanySignUp(req, res, next) {
        let emailExists = await User.findOne({ 'email': req.body.email });

        if (emailExists) {
            req.session.error = "Email already exists";
            console.log('Email already exists');
            return res.redirect('back');
        } else {

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
        }
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

        req.body.images = [];

        for (const file of req.files) {
            if (user.sliderPhotos.length > 0) {
                user.sliderPhotos.forEach(async function (photo) {
                    await cloudinary.v2.uploader.destroy(photo.public_id);
                });
            }
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
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
        if (req.body.images) user.sliderPhotos = req.body.images;
        if (req.body.languages) user.language = req.body.languages;
        if (req.body.products) user.productsUsed = req.body.products;
        if (areasOfExpertise) user.areasOfExpertise = req.body.areasOfExpertise;
        if (req.body.tags) user.tags = req.body.tags;



        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Profile successfully updated!";
        req.session.success = "Profile Updated";
        // redirect to show page
        res.redirect("/company-dashboard");
        console.log(user.language);
        console.log(user.productsUsed);
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
        if (!user.isActive) {
            req.session.error = "The Account is currently de-activated!";
            res.redirect('/');

        } else {
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
        }

    },

    googleLogin() {
        passport.authenticate('google', { scope: ['profile'] });
    },


    googleCallback() {
        passport.authenticate('google', { failureRedirect: '/login' }),
            function (req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            }
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
            title: req.body.title,
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
            title,
            Description
        } = req.body;

        if (year) journey.year = req.body.year;
        if (title) journey.title = req.body.title;
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
            service: req.body.service,
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
            service,
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
        if (service) portfolio.service = req.body.service;

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

    // COMPANY SETTINGS PAGES

    // GET account settings
    async getAccount(req, res, next) {
        res.render('businesses/account', { title: 'Settings' });
    },

    //Company Update
    async putAccount(req, res, next) {
        const user = req.user;

        const {
            email
        } = req.body;

        if (email) user.email = req.body.email;

        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Profile Updated";
        res.redirect("/company-settings/account");
    },

    // GET billing settings
    async getBilling(req, res, next) {
        const user = req.user;
        res.render('businesses/billing', { title: 'Settings', user });
    },

    // GET company-info settings
    // async getCompanyInfo(req, res, next) {
    //     res.render('businesses/company-info', { title: 'Settings' });
    // },

    // GET notifications settings
    async getNotifications(req, res, next) {
        res.render('businesses/notifications', { title: 'Settings' });
    },

    // GET profile settings
    async getProfile(req, res, next) {
        res.render('businesses/profile', { title: 'Settings' });
    },

    //Edit Profile
    async putProfile(req, res, next) {
        let user = req.user;
        if (req.file) {
            if (user.profilePictureId) await cloudinary.v2.uploader.destroy(user.profilePictureId);
            // upload image
            let picture = await cloudinary.v2.uploader.upload(req.file.path);
            // add images to post.images array
            user.profilePicture = picture.secure_url;
            user.profilePictureId = picture.public_id;
        }

        const {
            firstName,
            lastName,
            location,
            city,
            state,
            zipCode,
            country,
            phoneNumber,
            about,
            twitterUrl,
            linkedinUrl,
            instagramUrl
        } = req.body;

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (location) user.location = location;
        if (city) user.city = req.body.city;
        if (state) user.state = req.body.state;
        if (zipCode) user.zipCode = req.body.zipCode;
        if (country) user.country = req.body.country;
        if (twitterUrl) user.twitterUrl = req.body.twitterUrl;
        if (linkedinUrl) user.linkedinUrl = req.body.linkedinUrl;
        if (instagramUrl) user.instagramUrl = req.body.instagramUrl;
        if (phoneNumber) user.phoneNumber = req.body.phoneNumber;
        if (about) user.about = req.body.about;

        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log("updated");
        req.session.success = "Profile Successfully Updated!";
        // redirect to show page
        res.redirect("/company-settings/profile");
    },

    // GET payment settings
    async getPayment(req, res, next) {
        res.render('businesses/payment', { title: 'Settings' });
    },

    // GET security settings
    async getSecurity(req, res, next) {
        res.render('businesses/security', { title: 'Settings' });
    },

    async putSecurity(req, res, next) {
        const user = req.user;
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Password Updated";
        res.redirect("/company-settings/security");
    },


    // GET verification settings
    async getVerification(req, res, next) {
        const user = req.user;
        let score = 0;
        let grade = "Poor"
        if (user.isEmailVerified || user.isFacebookVerified) {
            score = 5;
            grade = "Good"
        } else if (user.isEmailVerified && user.isFacebookVerified) {
            score = 10;
            grade = "Excellent"
        } else {
            score = 0;
            grade = "Poor"
        }
        res.render('businesses/trust-verification', { title: 'Settings', score, grade });
    },



    //GET /company-dashboard/reviews
    async getReviews(req, res, next) {
        let user = req.user;
        let review;

        if (req.body.filter === 'recent') {

            review = await Review.find().where("owner.id").equals(user._id).sort({ 'createdAt': -1 }).exec();
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
            let average = await calculateAverage(review).toFixed(1);
            res.render('businesses/reviews', { title: 'Dashboard | Reviews', review, average });

        } else if (req.body.filter === 'positive') {

            review = await Review.find({ rating: { $gte: 4 } }).where("owner.id").equals(user._id).exec();
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
            let average = await calculateAverage(review).toFixed(1);
            res.render('businesses/reviews-positive', { title: 'Dashboard | Reviews', review, average });

        } else if (req.body.filter === 'negative') {

            review = await Review.find({ rating: { $gte: 0, $lte: 3.9 } }).where("owner.id").equals(user._id).exec();
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
            let average = await calculateAverage(review).toFixed(1);
            res.render('businesses/reviews-negative', { title: 'Dashboard | Reviews', review, average });

        } else if (req.body.filter === 'neutral') {

            review = await Review.find({ rating: { $in: 3 } }).where("owner.id").equals(user._id).exec();
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
            let average = await calculateAverage(review).toFixed(1);
            res.render('businesses/reviews-neutral', { title: 'Dashboard | Reviews', review, average });

        } else {
            review = await Review.find().where("owner.id").equals(user._id).sort({ 'createdAt': -1 }).exec();
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
            let average = await calculateAverage(review).toFixed(1);
            res.render('businesses/reviews', { title: 'Dashboard | Reviews', review, average });

        }
    },


    async garageServices(req, res, next) {
        let user = await User.findById(req.user);
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Garage services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Garage services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Garage services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Garage services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/garage-services', { title: 'Company Profile', user, company, review, total });
        }
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
            tags: req.body.tags,
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
            tags
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
        if (tags) service.tags = req.body.tags;

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
            service: req.body.service,
            description: req.body.description,
            images: req.body.images,
            owner: owner,
            time: req.body.time,
            tags: req.body.tags,
            specificationTitle: req.body.specificationTitle,
            specificationDescription: req.body.specificationDescription,
            deliveryInfo: req.body.deliveryInfo,
            deliveryCharge: req.body.deliveryCharge,
            returnTime: req.body.returnTime,
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
            service,
            description,
            time,
            tags,
            specificationTitle,
            specificationDescription,
            deliveryInfo,
            deliveryCharge,
            returnTime
        } = req.body;

        if (title) product.title = req.body.title;
        if (category) product.category = req.body.category;
        if (description) product.description = req.body.description;
        if (price) product.price = req.body.price;
        if (tags) product.tags = req.body.tags;
        if (specificationTitle) product.specificationTitle = req.body.specificationTitle;
        if (specificationDescription) product.specificationDescription = req.body.specificationDescription;
        if (deliveryInfo) product.deliveryInfo = req.body.deliveryInfo;
        if (deliveryCharge) product.deliveryCharge = req.body.deliveryCharge;
        if (returnTime) product.returnTime = req.body.returnTime;
        if (time) product.time = req.body.time;
        if (service) product.service = req.body.service;

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
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
        let service = await Service.find().where("owner.id").equals(company._id).exec();
        let mediaPhoto = await MediaPhoto.find().where("owner.id").equals(company._id).exec();
        let review = await Review.find().where("owner.id").equals(company._id).exec();
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
        let average = calculateAverage(review).toFixed(1)
            ;
        res.render('show-pages/company-profile', {
            title: 'Company Profile',
            average,
            company,
            service,
            mediaPhoto,
            review,
            lists,
            user
        });
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
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let journey = await Journey.find().where("owner.id").equals(company._id).exec();
        let certificate = await Certificate.find().where("owner.id").equals(company._id).exec();
        let mediaPhoto = await MediaPhoto.find().where("owner.id").equals(company._id).exec();
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/about', { title: 'Company Profile', lists, average, total, company, journey, certificate, mediaPhoto, review });
    },

    async companyProfileMedia(req, res, next) {
        let company = await User.findById(req.params.id);
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let photo = await MediaPhoto.find().where("owner.id").equals(company._id).exec();
        let video = await MediaVideo.find().where("owner.id").equals(company._id).exec();
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/media', { title: 'Company Profile', lists, average, total, company, photo, video, review });
    },

    async companyProfileEmployee(req, res, next) {
        let company = await User.findById(req.params.id);
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let employee = await Employee.find().where("owner.id").equals(company._id).exec();
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/employees', { title: 'Company Profile', lists, average, total, company, employee, review });
    },

    async companyProfilePortfolio(req, res, next) {
        let company = await User.findById(req.params.id);
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let portfolio = await Portfolio.find().where("owner.id").equals(company._id).exec();
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/portfolio', { title: 'Company Profile', lists, average, total, company, portfolio, review });
    },

    async companyProfileServices(req, res, next) {
        let company = await User.findById(req.params.id);
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let product = await Product.find().where("owner.id").equals(company._id).exec();
        let service = await Service.find().where("owner.id").equals(company._id).exec();
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/services-products', { title: 'Company Profile', lists, average, total, company, product, service, review });
    },

    async companyProfileReviews(req, res, next) {
        let company = await User.findById(req.params.id);
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
        let review;
        let fiveReview = [];
        let fourReview = [];
        let threeReview = [];
        let twoReview = [];
        let oneReview = [];
        let average;

        async function others(page) {
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
            average = calculateAverage(review).toFixed(1);
            company.averageReview = average.toString();
            await company.save();
            res.render(page,
                {
                    title: 'Company Profile',
                    review,
                    company,
                    average,
                    fiveReview,
                    fourReview,
                    threeReview,
                    twoReview,
                    oneReview,
                    lists,
                    total
                });
        }

        if (req.body.filter === 'recent') {

            review = await Review.find().where("owner.id").equals(company._id).sort({ 'createdAt': -1 }).exec();
            others('show-pages/reviews');

        } else if (req.body.filter === 'positive') {

            review = await Review.find({ rating: { $gte: 4 } }).where("owner.id").equals(company._id).exec();
            others('show-pages/reviews-positive');

        } else if (req.body.filter === 'neutral') {

            review = await Review.find({ rating: { $in: 3 } }).where("owner.id").equals(company._id).exec();
            others('show-pages/reviews-neutral');

        } else if (req.body.filter === 'negative') {

            review = await Review.find({ rating: { $gte: 0, $lte: 3.9 } }).where("owner.id").equals(company._id).exec();
            others('show-pages/reviews-negative');

        } else {

            review = await Review.find().where("owner.id").equals(company._id).sort({ 'createdAt': -1 }).exec();
            others('show-pages/reviews');

        }
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

        await company.reviews.push(review);
        await company.save();

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "Review successfully created!";
        // redirect to show page
        res.redirect("back");
    },

    async serviceDetails(req, res, next) {
        let service = await Service.findById(req.params.id);
        let user = await req.user;
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company = await User.findById(service.owner.id).populate({
            path: 'reviews',
            options: { sort: { '_id': -1 } },
        }).exec();;
        let otherServices = await Service.find().where("owner.id").equals(company).exec();
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/service-details', { title: 'Company Profile', lists, average, total, service, company, otherServices, review });
    },

    async productDetails(req, res, next) {
        let product = await Product.findById(req.params.id);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company = await User.findById(product.owner.id).populate({
            path: 'reviews',
            options: { sort: { '_id': -1 } },
        }).exec();
        let user = await req.user;
        let lists;
        let otherProducts = await Product.find().where("owner.id").equals(company).exec();
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/product-details', { title: 'Company Profile', lists, average, total, product, company, otherProducts, review });
    },

    async companyProfileFaq(req, res, next) {
        let company = await User.findById(req.params.id).populate({
            path: 'reviews',
            options: { sort: { '_id': -1 } },
        }).exec();
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let user = await req.user;
        let faq = await Faq.find().where("owner.id").equals(company._id).exec();
        let review = await company.reviews;
        let lists;
        if (user) {
            lists = await List.find().where("owner.id").equals(user._id).exec();
        }
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
        let average = calculateAverage(review).toFixed(1);
        res.render('show-pages/faq', { title: 'Company Profile', lists, average, total, company, faq, review });
    },


    //Services Pages Controllers
    async garageServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Garage services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Garage services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Garage services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Garage services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/garage-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async roofingServies(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Roofing Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Roofing Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Roofing Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Roofing Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/roofing-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async landscapingServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Landscaping services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Landscaping services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Landscaping services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Landscaping services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/landscaping-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async pavingServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Paving services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Paving services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Paving services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Paving services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/paving-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async fencingServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Fencing services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Fencing services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Fencing services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Fencing services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/fencing-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async junkRemoval(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Junk Removal").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Junk Removal").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Junk Removal").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Junk Removal").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/junk-removal', { title: 'Company Profile', user, company, review, total });
        }
    },

    async generalSiding(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("General Siding").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("General Siding").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("General Siding").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("General Siding").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/general-siding', { title: 'Company Profile', user, company, review, total });
        }
    },

    async exteriorPainting(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Exterior Painting").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Exterior Painting").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Exterior Painting").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Exterior Painting").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/exterior-painting', { title: 'Company Profile', user, company, review, total });
        }
    },

    async poolsSpas(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Pools, Spas and Hot Tubs").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Pools, Spas and Hot Tubs").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Pools, Spas and Hot Tubs").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Pools, Spas and Hot Tubs").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/pools-hot-tubes-spas', { title: 'Company Profile', user, company, review, total });
        }
    },

    async masonryServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Masonry services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Masonry services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Masonry services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Masonry services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/masonry-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async plumbingServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Plumbing Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Plumbing Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Plumbing Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Plumbing Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/plumbing-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async hvacServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("HVAC Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("HVAC Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("HVAC Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("HVAC Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/hvac-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async dryWallAndInsulation(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Dry Wall & Insulation").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Dry Wall & Insulation").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Dry Wall & Insulation").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Dry Wall & Insulation").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/drywall-and-insulation', { title: 'Company Profile', user, company, review, total });
        }
    },

    async pestControl(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Pest Control").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Pest Control").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Pest Control").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Pest Control").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/pest-control', { title: 'Company Profile', user, company, review, total });
        }
    },

    async generalCleaning(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("General cleaning").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("General cleaning").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("General cleaning").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("General cleaning").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/general-cleaning', { title: 'Company Profile', user, company, review, total });
        }
    },

    async interiorPainting(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Interior Painting").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Interior Painting").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Interior Painting").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Interior Painting").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/interior-painting', { title: 'Company Profile', user, company, review, total });
        }
    },

    async windowDoorServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Window & Door Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Window & Door Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Window & Door Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Window & Door Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/window-and-door-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async flooringServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Flooring Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Flooring Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Flooring Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Flooring Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/flooring-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async generalRemodeling(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("General Remodeling").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("General Remodeling").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("General Remodeling").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("General Remodeling").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/general-remodeling', { title: 'Company Profile', user, company, review, total });
        }
    },

    async carpentersServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Carpenters Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Carpenters Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Carpenters Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Carpenters Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/carpenters-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async towingServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Towing Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Towing Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Towing Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Towing Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/towing-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async oilAndFluidExchange(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Oil & Fluid Exchange").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Oil & Fluid Exchange").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Oil & Fluid Exchange").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Oil & Fluid Exchange").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/oil-and-fluid-exchange', { title: 'Company Profile', user, company, review, total });
        }
    },

    async bodyShop(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Body Shop").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Body Shop").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Body Shop").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Body Shop").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/body-shop', { title: 'Company Profile', user, company, review, total });
        }
    },

    async mufflersAndExhaust(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Mufflers & Exhaust Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Mufflers & Exhaust Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Mufflers & Exhaust Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Mufflers & Exhaust Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/mufflers-and-exhaust', { title: 'Company Profile', user, company, review, total });
        }
    },

    async suspensionServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Suspension Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Suspension Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Suspension Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Suspension Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/suspension-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async brakeChange(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Brake Change").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Brake Change").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Brake Change").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Brake Change").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/brake-change', { title: 'Company Profile', user, company, review, total });
        }
    },

    async alarmInstallation(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Alarm Installation").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Alarm Installation").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Alarm Installation").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Alarm Installation").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/alarm-installation', { title: 'Company Profile', user, company, review, total });
        }
    },

    async engineDiagnostic(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Engine Diagnostic Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Engine Diagnostic Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Engine Diagnostic Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Engine Diagnostic Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/engine-diagnostic', { title: 'Company Profile', user, company, review, total });
        }
    },

    async heatingAndCooling(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Heating & Cooling").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Heating & Cooling").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Heating & Cooling").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Heating & Cooling").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/heating-and-cooling', { title: 'Company Profile', user, company, review, total });
        }
    },

    async wheelAndTire(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Wheel & Tire Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Wheel & Tire Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Wheel & Tire Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Wheel & Tire Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/wheel-and-tire', { title: 'Company Profile', user, company, review, total });
        }
    },

    async checkEngineLight(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Check Engine Light").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Check Engine Light").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Check Engine Light").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Check Engine Light").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/check-engine-light', { title: 'Company Profile', user, company, review, total });
        }
    },

    async batteryServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Battery Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Battery Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Battery Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Battery Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/battery-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async windowTinting(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Window Tinting").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Window Tinting").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Window Tinting").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Window Tinting").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/window-tinting', { title: 'Company Profile', user, company, review, total });
        }
    },

    async generalHandyman(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("General Handyman").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("General Handyman").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("General Handyman").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("General Handyman").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/general-handyman', { title: 'Company Profile', user, company, review, total });
        }
    },

    async generalContractor(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("General Contractor").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("General Contractor").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("General Contractor").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("General Contractor").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/general-contractor', { title: 'Company Profile', user, company, review, total });
        }
    },

    async electricalServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Electrical Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Electrical Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Electrical Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Electrical Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/electrical-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async movingServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Moving Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Moving Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Moving Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Moving Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/moving-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async buildingSecurity(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Building Security").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Building Security").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Building Security").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Building Security").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/building-security', { title: 'Company Profile', user, company, review, total });
        }
    },

    async demolitionServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Demolition Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Demolition Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Demolition Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Demolition Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/demolition-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async applianceRepairs(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Appliance Repairs & Installation").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Appliance Repairs & Installation").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Appliance Repairs & Installation").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Appliance Repairs & Installation").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/appliance-repairs', { title: 'Company Profile', user, company, review, total });
        }
    },

    async locksmithServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Locksmith Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Locksmith Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Locksmith Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Locksmith Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/locksmith-services', { title: 'Company Profile', user, company, review, total });
        }
    },

    async fleetServices(req, res, next) {
        let user = await User.findById(req.user);
        let total = await User.find({ isEmailVerified: true }).where("isCompany").equals(true).exec();
        let company;
        let filter = req.body.filter;
        let zip = req.body.zip;
        let sorting = {}
        if (req.body.sort === 'asc') {
            sorting = await { 'companyName': -1 }
        } else if (req.body.sort === 'desc') {
            sorting = await { 'companyName': 1 }
        } else if (req.body.sort === 'created') {
            sorting = await { 'createdAt': -1 }
        } else if (req.body.sort === 'rated') {
            sorting = await { 'averageReview': 1 }
        } else {
            sorting = await { 'id': -1 }
        }

        if (filter) {
            if (zip && filter) {
                company = await User.find({ isEmailVerified: true, zipCode: zip, filters: { $in: filter } }).where("serviceCategory").equals("Fleet Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            } else {
                company = await User.find({ isEmailVerified: true, filters: { $in: filter } }).where("serviceCategory").equals("Fleet Services").populate({
                    path: 'reviews',
                    options: { sort: { '_id': -1 } },
                }).sort(sorting).exec();
            }
        } else if (zip) {
            company = await User.find({ isEmailVerified: true, zipCode: zip, }).where("serviceCategory").equals("Fleet Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        } else {
            company = await User.find({ isEmailVerified: true }).where("serviceCategory").equals("Fleet Services").populate({
                path: 'reviews',
                options: { sort: { '_id': -1 } },
            }).sort(sorting).exec();
        }
        let review = await Review.find().where("owner.id").equals(company._id).exec();
        if (req.xhr) {
            res.json(company);
        } else {
            res.render('show-pages/fleet-services', { title: 'Company Profile', user, company, review, total });
        }
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

    async likes(req, res, next) {
        let company = await User.findById(req.params.id);
        let user = req.user;
        if (!user.likes.includes(company._id)) {
            await user.likes.push(company);
            // await company.liked++;
            await User.findOneAndUpdate({ _id: req.params.id }, { $inc: { liked: 1 } }, { new: true }).exec();
        } else {
            colsole.log("ALREADY LIKED")
        }
        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log("LIKED!!!");
        req.session.success = "Profile successfully updated!";
        // redirect to show page
        res.redirect("back");
    },

    async unlike(req, res, next) {
        let company = await User.findById(req.params.id);
        let user = req.user;

        const index = user.likes.indexOf(company);
        await user.likes.splice(index, 1);
        await User.findOneAndUpdate({ _id: req.params.id }, { $inc: { liked: -1 } }, { new: true }).exec();
        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log("UNLIKED!!!");
        req.session.success = "Profile successfully updated!";
        // redirect to show page
        res.redirect("back");
    },


    // ROUTE for creating list
    async createList(req, res, next) {
        // find the user
        const user = req.user;
        const owner = {
            id: req.user._id,
            username: req.user.username
        }

        const newList = new List({
            title: req.body.title,
            owner: owner,
        });

        // save the updated journey into the db
        let list = await List.create(newList);

        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = "List Created!";
        console.log("List Created");
        // redirect to show page
        res.redirect("back");
    },

    //Route for deleting List
    async deleteList(req, res, next) {
        let list = await List.findById(req.params.id);
        await list.remove();
        req.session.error = "List Deleted!";
        res.redirect("/saved-list");
    },

    async saveToList(req, res, next) {
        let company = await User.findById(req.params.companyId);
        let user = req.user;
        let lists = await List.find();
        let whichList = await List.findById(req.params.listId);
        //check if it is saved to the default list
        console.log(req.params);
        if (!whichList.companies.includes(company._id)) {
            await whichList.companies.push(company);
            whichList.save();
            console.log("saved");
        } else {
            console.log("ALREADY SAVED");
        }
        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log("SAVED!!!");
        req.session.success = "Profile successfully updated!";
        // redirect to show page
        res.redirect("back");
    },

    async defaultList(req, res, next) {
        let company = await User.findById(req.params.companyId);
        let user = req.user;
        //check if it is saved to the default list
        console.log(req.params);

        //else save to the selected list by id
        if (!user.list.includes(company._id)) {
            await user.list.push(company);
        } else {
            colsole.log("ALREADY SAVED");
        }
        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log("SAVED!!!");
        req.session.success = "Profile successfully updated!";
        // redirect to show page
        res.redirect("back");
    },

    async removeFromList(req, res, next) {
        // search through all the lists owned by the user and delete the company
        let company = await User.findById(req.params.id);
        let user = req.user;
        const index = user.list.indexOf(company);
        await user.list.splice(index, 1);
        // save the updated user into the db
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log("REMOVED!!!");
        req.session.success = "Profile successfully updated!";
        // redirect to show page
        res.redirect("/saved-list");
    },

    async removeCompanyFromList(req, res, next) {
        let list = await List.findById(req.params.listId);
        await List.update(
            { _id: req.params.listId },
            { "$pull": { "companies": req.params.companyId } },
            { safe: true, multi: true }
        );
        console.log("REMOVED!!!");
        req.session.success = "List successfully updated!";
        // redirect to show page
        res.redirect("/saved-list");
    },


    async deactivateAccount(req, res, next) {
        const user = req.user;
        if (user.isActive) user.isActive = false;
        await user.save();

        const token = await crypto.randomBytes(20).toString('hex');
        user.activateToken = token;
        user.activateExpires = Date.now() + 86400000000000;

        await user.save();

        console.log("Account Deactivated");

        const msg = {
            to: user.email,
            from: 'GABAZZO <no-reply@gabazzo.com>',
            subject: 'GABAZZO - Account Deactivation',
            text: `We are sad to see you go ${user.username}.
				To re-activate your account at anytime, click on the following link, or copy and paste it into your browser to complete the process:
				http://${req.headers.host}/activate/${token}`.replace(/				/g, ''),
        };

        await sgMail.send(msg);

        req.session.success = `An e-mail has been sent to ${user.email}.`;

        console.log("Account Deactivated");
        req.session.success = "Account Deactivated";
        // redirect to show page
        res.redirect("/logout");
    },


    // RE-ACTIVATE ACCOUNT

    async activateAccount(req, res, next) {
        const { token } = req.params;
        const user = await User.findOne({ activateToken: token, activateExpires: { $gt: Date.now() } });

        if (!user) {
            req.session.error = 'Activation token is invalid or has expired.';
            return res.redirect(`/activate/${token}`);
        }

        user.isActive = true;
        user.activateToken = null;
        user.activateExpires = null;
        await user.save();

        const msg = {
            to: user.email,
            from: 'GABAZZO <no-reply@gabazzo.com>',
            subject: 'GABAZZO - Account Re-activated',
            text: `Hello, This email is to confirm that your account has just been re-activated.
            Kindly login here: http://${req.headers.host}/login}`.replace(/		  	/g, '')
        };

        await sgMail.send(msg);
        res.redirect('/login');
    },

    //GET saved to list
    async getSavedListItems(req, res, next) {
        let user = await User.findById(req.user).populate('users');
        let ids = [];
        await user.list.forEach(function (comp) {
            ids.push(comp);
        });
        let company = await User.find().where('_id').in(ids).exec();
        res.render('businesses/saved-list-items', { title: 'Saved List', user, company });
    },

    //GET saved to list
    async getOtherListItems(req, res, next) {
        let user = await User.findById(req.user).populate('users');
        let list = await List.findById(req.params.id);
        let ids = [];
        await list.companies.forEach(function (comp) {
            ids.push(comp);
        });
        let company = await User.find().where('_id').in(ids).exec();
        res.render('businesses/other-list-items', { title: 'Saved List', user, company, list });
    },


    //GET saved to list
    async getSavedList(req, res, next) {
        let user = await User.findById(req.user).populate('users');
        let lists = await List.find().where("owner.id").equals(user._id).exec();
        let ids = [];
        await user.list.forEach(function (comp) {
            ids.push(comp);
        });
        let company = await User.find().where('_id').in(ids).exec();
        res.render('businesses/saved-list', { title: 'Saved List', user, company, lists });
    },

    //PUT Security Question
    async putSecurityQuestion(req, res, next) {
        let user = req.user;
        const {
            question,
            answer,
        } = req.body;

        if (question) user.securityQuestion.question = req.body.question;
        if (answer) user.securityQuestion.answer = req.body.answer;

        await user.save();
        req.session.success = "Security question successfully Updated!";
        // redirect to show page
        res.redirect("back");
    },

    //PUT Billing
    async putBilling(req, res, next) {
        let user = req.user;
        const {
            companyName,
            fullName,
            country,
            address,
            city,
            zipCode
        } = req.body;

        if (companyName) user.billing.companyName = req.body.companyName;
        if (fullName) user.billing.fullName = req.body.fullName;
        if (country) user.billing.country = req.body.country;
        if (address) user.billing.address = req.body.address;
        if (city) user.billing.city = req.body.city;
        if (zipCode) user.billing.zipCode = req.body.zipCode;

        await user.save();
        req.session.success = "Billing Info successfully Updated!";
        // redirect to show page
        res.redirect("back");
    },


};