const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage, fileFilter: imageFilter });
const {
  postSignUp,
  postLogin,
  getLogout,
  getSignup,
  getLogin,
  getCompanySignUp,
  postCompanySignUp,
  getCompanySignUp2,
  postCompanySignUp2,
  getCompanySignUp3,
  getCompanySignUp4,
  postCompanySignUp4,
  getCompanySignUp5,
  getVerify,
  getCompanyDashboard
} = require('../controllers');
const { asyncErrorHandler, checkIfUserExists, isLoggedIn } = require('../middleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'GABAZZO' });
});

/* GET sign-up */
router.get('/sign-up', getSignup);


/* POST /sign-up */
router.post('/sign-up', checkIfUserExists, asyncErrorHandler(postSignUp));

/* GET company-sign-up1 */
router.get('/company-sign-up', checkIfUserExists, getCompanySignUp);

/* POST /company-sign-up */
router.post('/company-sign-up', upload.single('profilePicture'), asyncErrorHandler(postCompanySignUp));

/* GET company-sign-up2 */
router.get('/company-sign-up2', isLoggedIn, getCompanySignUp2);

/* POST /company-sign-up2 */
router.post('/company-sign-up2', isLoggedIn, upload.single('logo'), asyncErrorHandler(postCompanySignUp2));

/* GET company-sign-up2 */
router.get('/company-sign-up3', isLoggedIn, getCompanySignUp3);

/* GET company-sign-up4 */
router.get('/company-sign-up4', isLoggedIn, getCompanySignUp4);

/* POST /company-sign-up4 */
router.post('/company-sign-up4', isLoggedIn, asyncErrorHandler(postCompanySignUp4));

/* GET /verify */
router.get('/verify/:token', isLoggedIn, asyncErrorHandler(getVerify));

/* GET company-sign-up5 */
router.get('/company-sign-up5', isLoggedIn, getCompanySignUp5);

/* GET /dashboard */
router.get('/company-dashboard', isLoggedIn, getCompanyDashboard);

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', postLogin);

/* GET /logout */
router.get('/logout', getLogout);

module.exports = router;
