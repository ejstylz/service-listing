const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|oog)$/i)) {
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
  getCompanyDashboard,
  getSellerOverview,
  getSellerDo,
  getSellerDoNot,
  getSellerOverview2,
  userUpdate,
  getAbout,
  getEmployees,
  getServices,
  getPortfolio,
  getProducts,
  getFaq,
  getMedia,
  getReviews,
  putAbout,
  postJourney,
  putJourney,
  deleteJourney,
  postCertificate,
  putCertificate,
  deleteCertificate,
  putProfilePicture,
  putLogo,
  postMediaPhoto,
  putMediaPhoto,
  deleteMediaPhoto,
  postMediaVideo,
  putMediaVideo,
  deleteMediaVideo
} = require('../controllers');
const { asyncErrorHandler,
  checkIfUserExists,
  isLoggedIn,
  goToAccountSecurity,
  goToPayment
} = require('../middleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'GABAZZO' });
});

/* GET seller-overview */
router.get('/become-a-seller-overview', getSellerOverview);

/* GET seller-overview */
router.get('/become-a-seller-overview-do', getSellerDo);

/* GET seller-overview */
router.get('/become-a-seller-overview-do-not', getSellerDoNot);

/* GET seller-overview */
router.get('/become-a-seller-overview2', getSellerOverview2);

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
router.get('/company-sign-up4', isLoggedIn, goToAccountSecurity, getCompanySignUp4);

/* POST /company-sign-up4 */
router.post('/company-sign-up4', isLoggedIn, asyncErrorHandler(postCompanySignUp4));

/* GET /verify */
router.get('/verify/:token', isLoggedIn, asyncErrorHandler(getVerify));

/* GET company-sign-up5 */
router.get('/company-sign-up5', goToPayment, getCompanySignUp5);

/* GET /dashboard */
router.get('/company-dashboard', isLoggedIn, getCompanyDashboard);

/* PUT /dashboard/:user_id */
router.put('/dashboard', isLoggedIn, userUpdate);

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', postLogin);

/* GET /logout */
router.get('/logout', isLoggedIn, getLogout);

/* GET /dashboard/about */
router.get('/company-dashboard/about', isLoggedIn, asyncErrorHandler(getAbout));

/* POST /journey */
router.post('/journey', asyncErrorHandler(postJourney));

/* PUT /journey */
router.put('/journey/:id', isLoggedIn, asyncErrorHandler(putJourney));

/* DELETE /journey */
router.delete('/journey/:id', isLoggedIn, asyncErrorHandler(deleteJourney));

/* POST /certificate */
router.post('/certificate', isLoggedIn, upload.single('image'), asyncErrorHandler(postCertificate));

/* PUT /certificate */
router.put('/certificate/:id', isLoggedIn, upload.single('image'), asyncErrorHandler(putCertificate));

/* Delete /certificate */
router.delete('/certificate/:id', isLoggedIn, asyncErrorHandler(deleteCertificate));

/* PUT /dashboard/about */
router.put('/dashboard/about', isLoggedIn, upload.single('video'), asyncErrorHandler(putAbout));

/* PUT /logo */
router.put('/logo', isLoggedIn, upload.single('logo'), asyncErrorHandler(putLogo));

/* PUT /profile-picture */
router.put('/profile-picture', isLoggedIn, upload.single('profilePicture'), asyncErrorHandler(putProfilePicture));

/* GET /dashboard/employees */
router.get('/company-dashboard/employees', isLoggedIn, getEmployees);

/* GET /dashboard/faq */
router.get('/company-dashboard/faq', isLoggedIn, getFaq);

/* GET /dashboard/media */
router.get('/company-dashboard/media', isLoggedIn, asyncErrorHandler(getMedia));

/* POST /media-photo */
router.post('/media-photo', isLoggedIn, upload.single('image'), asyncErrorHandler(postMediaPhoto));

/* PUT /media-photo */
router.put('/media-photo/:id', isLoggedIn, asyncErrorHandler(putMediaPhoto));

/* Delete /media-photo */
router.delete('/media-photo/:id', isLoggedIn, asyncErrorHandler(deleteMediaPhoto));

/* POST /media-video */
router.post('/media-video', isLoggedIn, upload.single('video'), asyncErrorHandler(postMediaVideo));

/* PUT /media-video */
router.put('/media-video/:id', isLoggedIn, asyncErrorHandler(putMediaVideo));

/* Delete /media-video */
router.delete('/media-video/:id', isLoggedIn, asyncErrorHandler(deleteMediaVideo));

/* GET /dashboard/portfolio */
router.get('/company-dashboard/portfolio', isLoggedIn, getPortfolio);

/* GET /dashboard/products */
router.get('/company-dashboard/products', isLoggedIn, getProducts);

/* GET /dashboard/reviews */
router.get('/company-dashboard/reviews', isLoggedIn, getReviews);

/* GET /dashboard/services */
router.get('/company-dashboard/services', isLoggedIn, getServices);

module.exports = router;
