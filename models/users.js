const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');


const UserSchema = new Schema({
    google: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phoneNumber: String,
    profilePicture: String,
    profilePictureId: String,
    logo: String,
    logoId: String,
    about: String,
    slogan: String,
    service: String,
    serviceCategory: String,
    isFacebookVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isCompany: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpires: Date,
    filters: [String],
    levels: [String],
    language: [String],
    companyName: String,
    facebookUrl: String,
    twitterUrl: String,
    instagramUrl: String,
    linkedinUrl: String,
    pinterestUrl: String,
    directions: String,
    videoUrl: String,
    videoId: String,
    sliderPhotos: [
        { url: String, public_id: String }
    ],
    videos: [
        { url: String, public_id: String }
    ],
    location: String,
    coordinates: Array,
    website: String,
    slogan: String,
    productsUsed: [String],
    tags: [String],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    certificates: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Certificate'
        }
    ],
    employees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Employee'
        }
    ],
    faqs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faq'
        }
    ],
    portfolios: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Portfolio'
        }
    ],
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    yearsInBusiness: String,
    areasOfExpertise: [String],
    serviceAreas: [String],
    productsUsed: [String],
    paymentMethod: [String],
    stateLicenseTrade: String,
    licenseNumber: String,
    licenseExpiration: String,
    entityType: String,
    insuranceType: String,
    insuranceExpiration: String,
    mondayFrom: String,
    mondayTo: String,
    tuesdayFrom: String,
    tuesdayTo: String,
    wednesdayFrom: String,
    wednesdayTo: String,
    thursdayFrom: String,
    thursdayTo: String,
    fridayFrom: String,
    fridayTo: String,
    saturdayFrom: String,
    saturdayTo: String,
    sundayFrom: String,
    sundayTo: String,
    Purpose: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    averageReview: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    list: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isActive: { type: Boolean, default: true },

    activateToken: String,
    activateExpires: Date,
    securityQuestion: { question: String, answer: String },
    liked: { type: Number, default: 0 },
    billing: {
        companyName: String,
        fullName: String,
        country: String,
        address: String,
        city: String,
        zipCode: String,
        sendEmail: { type: Boolean, default: true },

    }

}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);