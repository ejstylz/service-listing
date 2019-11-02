const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    service: String,
    serviceCategory: String,
    isFacebookVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isCompany: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpires: Date,
    filters: [String],
    levels: [String],
    companyName: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);