// require('dotenv').config();

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const index = require('./routes/index');
const User = require('./models/users');

const app = express();

//connect to the database
// mongoose.connect("mongodb://localhost:27017/gabazzo", { useNewUrlParser: true });
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("WE'RE CONNECTED!");
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.locals.moment = require('moment');

// Configure passport and sessions
app.use(
  session({
    secret: 'wow cool dude!',
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

//GOOGLE STRATEGY
passport.use(new GoogleStrategy({

  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
  passReqToCallback: true

},
  (request, token, refreshToken, profile, done) => {
    process.nextTick(() => {
      // console.log(profile);
      User.findOne({ 'email': profile.emails[0].value }, (err, user) => {
        if (err)
          return done(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.isEmailVerified = true;
          newUser.about = "";
          newUser.username = profile.name.givenName;
          newUser.google.email = profile.emails[0].value; // pull the first email

          newUser.save((err) => {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

//FACEBOOK STRATEGY
passport.use(new FacebookStrategy({

  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ["email", "name"],
  passReqToCallback: true

},
  (request, token, refreshToken, profile, done) => {
    process.nextTick(() => {
      // console.log(profile);
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        if (err)
          return done(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.displayName;
          // newUser.email = profile.emails[0].value;
          newUser.username = profile.name.givenName;
          newUser.isFacebookVerified = true;
          newUser.about = "";
          // newUser.facebook.email = profile.emails[0].value; // pull the first email

          newUser.save((err) => {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

passport.use(User.createStrategy());

passport.serializeUser(function (account, done) {
  done(null, account.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, account) {
    done(err, account);
  });
});


// set local variables middleware
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.hostName = req.headers.host;
  // set default page title
  res.locals.title = 'GABAZZO';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // continue on to next function in middleware chain
  next();
});

// Mount Routes
app.use('/', index);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

module.exports = app;
