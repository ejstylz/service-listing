const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
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
  getHomePage,
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
  deleteMediaVideo,
  postEmployee,
  putEmployee,
  deleteEmployee,
  postPortfolio,
  putPortfolio,
  deletePortfolio,
  postService,
  putService,
  deleteService,
  postProduct,
  putProduct,
  deleteProduct,
  postFaq,
  putFaq,
  deleteFaq,
  companyProfileShow,
  companyProfileAbout,
  companyProfileMedia,
  companyProfileEmployee,
  companyProfilePortfolio,
  companyProfileServices,
  companyProfileReviews,
  serviceDetails,
  productDetails,
  companyProfileFaq,
  garageServices,
  roofingServies,
  landscapingServices,
  pavingServices,
  fencingServices,
  junkRemoval,
  generalSiding,
  exteriorPainting,
  poolsSpas,
  masonryServices,
  plumbingServices,
  hvacServices,
  dryWallAndInsulation,
  pestControl,
  generalCleaning,
  interiorPainting,
  windowDoorServices,
  flooringServices,
  generalRemodeling,
  carpentersServices,
  towingServices,
  oilAndFluidExchange,
  bodyShop,
  mufflersAndExhaust,
  suspensionServices,
  brakeChange,
  alarmInstallation,
  engineDiagnostic,
  heatingAndCooling,
  wheelAndTire,
  checkEngineLight,
  batteryServices,
  windowTinting,
  generalHandyman,
  generalContractor,
  electricalServices,
  movingServices,
  buildingSecurity,
  demolitionServices,
  applianceRepairs,
  locksmithServices,
  fleetServices,
  getMemberProfile,
  companyContact,
  search,
  createReview,
  reviewReply,
  getForgotPw,
  putForgotPw,
  getReset,
  putReset,
  getAboutUs,
  getBlogSingle,
  getBlog,
  getContactUs,
  getCookiePolicy,
  getHelpBuyer,
  getHelpSeller,
  getHowBusiness,
  getHowMember,
  getPress,
  getPrivacyPolicy,
  getSafetyBuyer,
  getSafetySeller,
  getSiteMap,
  getTerms,
  getCompanySignUpHome,
  getAccount,
  getBilling,
  getCompanyInfo,
  getNotifications,
  getPayment,
  getSecurity,
  getVerification,
  putAccount,
  putSecurity,
  likes,
  unlike,
  saveToList,
  removeFromList,
  getProfile,
  putProfile,
  activateAccount,
  deactivateAccount,
  getSavedListItems,
  getSavedList,
  putSecurityQuestion,
  putBilling,
  roofingServiesFilter,
  createList,
  deleteList,
  getOtherListItems,
  removeCompanyFromList,
  defaultList
} = require('../controllers');
const {
  asyncErrorHandler,
  checkIfUserExists,
  isLoggedIn,
  goToAccountSecurity,
  goToPayment,
  isCompany,
  isMember,
  changePassword,
  isValidPassword,
  isNotCompany,
  isEmailVerified,
  isRegistered
} = require('../middleware');

/* GET home page. */
router.get('/', asyncErrorHandler(getHomePage));

/* GET about-us. */
router.get('/about-us', asyncErrorHandler(getAboutUs));

/* GET blog-single-post. */
router.get('/blog-single-post', asyncErrorHandler(getBlogSingle));

/* GET blog. */
router.get('/blog', asyncErrorHandler(getBlog));

/* GET contact-us. */
router.get('/contact-us', asyncErrorHandler(getContactUs));

/* GET cookie-policy. */
router.get('/cookie-policy', asyncErrorHandler(getCookiePolicy));

/* GET help-center-buyer. */
router.get('/help-center-buyer', asyncErrorHandler(getHelpBuyer));

/* GET help-center-seller. */
router.get('/help-center-seller', asyncErrorHandler(getHelpSeller));

/* GET how-it-works-business-owner. */
router.get('/how-it-works-business-owner', asyncErrorHandler(getHowBusiness));

/* GET how-it-works-member. */
router.get('/how-it-works-members', asyncErrorHandler(getHowMember));

/* GET press-and-news. */
router.get('/press-and-news', asyncErrorHandler(getPress));

/* GET privacy-policy. */
router.get('/privacy-policy', asyncErrorHandler(getPrivacyPolicy));

/* GET safety-buyer. */
router.get('/safety-buyer', asyncErrorHandler(getSafetyBuyer));

/* GET safety-seller. */
router.get('/safety-seller', asyncErrorHandler(getSafetySeller));

/* GET site-map. */
router.get('/site-map', asyncErrorHandler(getSiteMap));

/* GET terms-and-conditions. */
router.get('/terms-and-conditions', asyncErrorHandler(getTerms));

/* POST search. */
router.post('/pages', search);

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
router.get('/company-sign-up-home', asyncErrorHandler(getCompanySignUpHome));

/* GET company-sign-up1 */
router.get('/company-sign-up', checkIfUserExists, getCompanySignUp);

/* POST /company-sign-up */
router.post('/company-sign-up', upload.single('profilePicture'), asyncErrorHandler(postCompanySignUp));

/* GET company-sign-up2 */
router.get('/company-sign-up2', isLoggedIn, isRegistered, getCompanySignUp2);

/* POST /company-sign-up2 */
router.post('/company-sign-up2', isLoggedIn, isRegistered, upload.single('logo'), asyncErrorHandler(postCompanySignUp2));

/* GET company-sign-up2 */
router.get('/company-sign-up3', isLoggedIn, isRegistered, getCompanySignUp3);

/* GET company-sign-up4 */
router.get('/company-sign-up4', isLoggedIn, isRegistered, goToAccountSecurity, getCompanySignUp4);

/* POST /company-sign-up4 */
router.post('/company-sign-up4', isLoggedIn, isRegistered, asyncErrorHandler(postCompanySignUp4));

/* GET /verify */
router.get('/verify/:token', isLoggedIn, asyncErrorHandler(getVerify));

/* GET company-sign-up5 */
router.get('/company-sign-up5', goToPayment, getCompanySignUp5);

/* GET /dashboard */
router.get('/member-profile/:id', isLoggedIn, isMember, getMemberProfile);

/* GET /dashboard */
router.get('/company-dashboard', isLoggedIn, isCompany, isEmailVerified, getCompanyDashboard);

/* PUT /dashboard/:user_id */
router.put('/dashboard', isLoggedIn, isCompany, isEmailVerified, upload.array('slider', 3), asyncErrorHandler(userUpdate));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', postLogin);

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }
  ));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

/* GET /logout */
router.get('/logout', isLoggedIn, getLogout);

/* GET /dashboard/about */
router.get('/company-dashboard/about', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(getAbout));

/* POST /journey */
router.post('/journey', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(postJourney));

/* PUT /journey */
router.put('/journey/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(putJourney));

/* DELETE /journey */
router.delete('/journey/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteJourney));

/* POST /certificate */
router.post('/certificate', isLoggedIn, isCompany, isEmailVerified, upload.single('image'), asyncErrorHandler(postCertificate));

/* PUT /certificate */
router.put('/certificate/:id', isLoggedIn, isCompany, isEmailVerified, upload.single('image'), asyncErrorHandler(putCertificate));

/* Delete /certificate */
router.delete('/certificate/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteCertificate));

/* PUT /dashboard/about */
router.put('/dashboard/about', isLoggedIn, isCompany, isEmailVerified, upload.single('video'), asyncErrorHandler(putAbout));

/* PUT /logo */
router.put('/logo', isLoggedIn, isCompany, isEmailVerified, upload.single('logo'), asyncErrorHandler(putLogo));

/* PUT /profile-picture */
router.put('/profile-picture', isLoggedIn, isEmailVerified, upload.single('profilePicture'), asyncErrorHandler(putProfilePicture));

/* GET /dashboard/employees */
router.get('/company-dashboard/employees', isLoggedIn, isCompany, isEmailVerified, getEmployees);

/* POST /employee */
router.post('/employee', isLoggedIn, isCompany, isEmailVerified, upload.single('image'), asyncErrorHandler(postEmployee));

/* PUT /employee */
router.put('/employee/:id', isLoggedIn, isCompany, isEmailVerified, upload.single('image'), asyncErrorHandler(putEmployee));

/* Delete /employee */
router.delete('/employee/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteEmployee))


/* GET /dashboard/faq */
router.get('/company-dashboard/faq', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(getFaq));

/* POST /faq */
router.post('/faq', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(postFaq));

/* PUT /portfolio */
router.put('/faq/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(putFaq));

/* Delete /portfolio */
router.delete('/faq/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteFaq));

/* GET /dashboard/media */
router.get('/company-dashboard/media', isCompany, isEmailVerified, isLoggedIn, asyncErrorHandler(getMedia));

/* POST /media-photo */
router.post('/media-photo', isLoggedIn, isCompany, isEmailVerified, upload.single('image'), asyncErrorHandler(postMediaPhoto));

/* PUT /media-photo */
router.put('/media-photo/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(putMediaPhoto));

/* Delete /media-photo */
router.delete('/media-photo/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteMediaPhoto));

/* POST /media-video */
router.post('/media-video', isLoggedIn, isCompany, isEmailVerified, upload.single('video'), asyncErrorHandler(postMediaVideo));

/* PUT /media-video */
router.put('/media-video/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(putMediaVideo));

/* Delete /media-video */
router.delete('/media-video/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteMediaVideo));

/* GET /dashboard/portfolio */
router.get('/company-dashboard/portfolio', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(getPortfolio));

/* POST /portfolio */
router.post('/portfolio', isLoggedIn, isCompany, isEmailVerified, upload.array('images'), asyncErrorHandler(postPortfolio));

/* PUT /portfolio */
router.put('/portfolio/:id', isLoggedIn, isCompany, isEmailVerified, upload.array('images'), asyncErrorHandler(putPortfolio));

/* Delete /portfolio */
router.delete('/portfolio/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deletePortfolio));


/* GET /dashboard/products */
router.get('/company-dashboard/products', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(getProducts));

/* POST /products */
router.post('/products', isLoggedIn, isCompany, isEmailVerified, upload.array('images'), asyncErrorHandler(postProduct));

/* PUT /products */
router.put('/products/:id', isLoggedIn, isCompany, isEmailVerified, upload.array('images'), asyncErrorHandler(putProduct));

/* Delete /products */
router.delete('/products/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteProduct));

/* GET /dashboard/reviews */
router.get('/company-dashboard/reviews', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(getReviews));

/* GET /dashboard/reviews */
router.post('/company-dashboard/reviews', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(getReviews));

/* PUT /review */
router.put('/review/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(reviewReply));

/* GET /dashboard/services */
router.get('/company-dashboard/services', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(getServices));

/* POST /services */
router.post('/services', isLoggedIn, isCompany, isEmailVerified, upload.array('images'), asyncErrorHandler(postService));

/* PUT /services */
router.put('/services/:id', isLoggedIn, isCompany, isEmailVerified, upload.array('images'), asyncErrorHandler(putService));

/* Delete /services */
router.delete('/services/:id', isLoggedIn, isCompany, isEmailVerified, asyncErrorHandler(deleteService));

// COMPANY SETTINGS

/* GET /company-settings/account */
router.get('/company-settings/account', isLoggedIn, asyncErrorHandler(getAccount));

/* PUT /company-settings/account */
router.put('/company-settings/account', isLoggedIn, asyncErrorHandler(putAccount));

/* GET /company-settings/billing */
router.get('/company-settings/billing', isLoggedIn, isCompany, asyncErrorHandler(getBilling));

// /* GET /company-settings/company-info */
// router.get('/company-settings/company-info', isLoggedIn, isCompany, asyncErrorHandler(getCompanyInfo));

/* GET /company-settings/notifications */
router.get('/company-settings/notifications', isLoggedIn, asyncErrorHandler(getNotifications));

/* GET /company-settings/payment */
router.get('/company-settings/payment', isLoggedIn, isCompany, asyncErrorHandler(getPayment));

/* GET /company-settings/security */
router.get('/company-settings/security', isLoggedIn, asyncErrorHandler(getSecurity));

/* PUT /company-settings/security */
router.put('/company-settings/security',
  isLoggedIn,
  isEmailVerified,
  asyncErrorHandler(isValidPassword),
  asyncErrorHandler(changePassword),
  asyncErrorHandler(putSecurity)
);

/* GET /company-settings/trust-verification */
router.get('/company-settings/trust-verification', isLoggedIn, asyncErrorHandler(getVerification));

/* GET /company-settings/profile */
router.get('/company-settings/profile', isLoggedIn, asyncErrorHandler(getProfile));

/* PUT /profile */
router.put('/profile', isLoggedIn, isNotCompany, upload.single('profilePicture'), asyncErrorHandler(putProfile));


//SHOW PAGES
/* GET company-profile */
router.get('/company-profile/:id', asyncErrorHandler(companyProfileShow));

// POST /company-contact
router.post('/company-contact', asyncErrorHandler(companyContact));


/* GET company-profile/about */
router.get('/company-profile/:id/about', asyncErrorHandler(companyProfileAbout));

/* GET company-profile/media */
router.get('/company-profile/:id/media', asyncErrorHandler(companyProfileMedia));

/* GET company-profile/employee */
router.get('/company-profile/:id/employees', asyncErrorHandler(companyProfileEmployee));

/* GET company-profile/portfolio */
router.get('/company-profile/:id/portfolio', asyncErrorHandler(companyProfilePortfolio));

/* GET company-profile/reviews */
router.get('/company-profile/:id/reviews', asyncErrorHandler(companyProfileReviews));
router.post('/company-profile/:id/reviews', asyncErrorHandler(companyProfileReviews));

/* POST /reviews */
router.post('/create-review/:id', isLoggedIn, upload.array('images'), asyncErrorHandler(createReview));

/* GET company-profile/services-products */
router.get('/company-profile/:id/services-products', asyncErrorHandler(companyProfileServices));

/* GET service*/
router.get('/service/:id', asyncErrorHandler(serviceDetails));

/* GET product*/
router.get('/product/:id', asyncErrorHandler(productDetails));

/* GET company-profile/faq */
router.get('/company-profile/:id/faq', asyncErrorHandler(companyProfileFaq));

/* GET services/garage-services */
router.get('/services/garage-services', asyncErrorHandler(garageServices));

/* POST services/garage-services */
router.post('/services/garage-services', asyncErrorHandler(garageServices));

/* GET services/landscaping-services */
router.get('/services/landscaping-services', asyncErrorHandler(landscapingServices));

/* POST services/landscaping-services */
router.post('/services/landscaping-services', asyncErrorHandler(landscapingServices));

/* GET services/paving-services */
router.get('/services/paving-services', asyncErrorHandler(pavingServices));

/* POST services/paving-services */
router.post('/services/paving-services', asyncErrorHandler(pavingServices));

/* GET services/fencing-services */
router.get('/services/fencing-services', asyncErrorHandler(fencingServices));

/* POST services/fencing-services */
router.post('/services/fencing-services', asyncErrorHandler(fencingServices));

/* GET services/junk-removal */
router.get('/services/junk-removal', asyncErrorHandler(junkRemoval));

/* POST services/junk-removal */
router.post('/services/junk-removal', asyncErrorHandler(junkRemoval));

/* GET services/general-siding */
router.get('/services/general-siding', asyncErrorHandler(generalSiding));

/* POST services/general-siding */
router.post('/services/general-siding', asyncErrorHandler(generalSiding));

/* GET services/exterior-painting */
router.get('/services/exterior-painting', asyncErrorHandler(exteriorPainting));

/* POST services/exterior-painting */
router.post('/services/exterior-painting', asyncErrorHandler(exteriorPainting));

/* GET services/pools-hot-tubes-spas */
router.get('/services/pools-hot-tubes-spas', asyncErrorHandler(poolsSpas));

/* POST services/pools-hot-tubes-spas */
router.post('/services/pools-hot-tubes-spas', asyncErrorHandler(poolsSpas));

/* GET services/masonry-services */
router.get('/services/masonry-services', asyncErrorHandler(masonryServices));
router.post('/services/masonry-services', asyncErrorHandler(masonryServices));

/* GET services/plumbing-services */
router.get('/services/plumbing-services', asyncErrorHandler(plumbingServices));
router.post('/services/plumbing-services', asyncErrorHandler(plumbingServices));

/* GET services/hvac-services */
router.get('/services/hvac-services', asyncErrorHandler(hvacServices));
router.post('/services/hvac-services', asyncErrorHandler(hvacServices));

/* GET services/drywall-and-insulation */
router.get('/services/drywall-and-insulation', asyncErrorHandler(dryWallAndInsulation));
router.post('/services/drywall-and-insulation', asyncErrorHandler(dryWallAndInsulation));

/* GET services/pest-control */
router.get('/services/pest-control', asyncErrorHandler(pestControl));
router.post('/services/pest-control', asyncErrorHandler(pestControl));

/* GET services/general-cleaning */
router.get('/services/general-cleaning', asyncErrorHandler(generalCleaning));
router.post('/services/general-cleaning', asyncErrorHandler(generalCleaning));

/* GET services/interior-painting */
router.get('/services/interior-painting', asyncErrorHandler(interiorPainting));
router.post('/services/interior-painting', asyncErrorHandler(interiorPainting));

/* GET services/window-and-door-services */
router.get('/services/window-and-door-services', asyncErrorHandler(windowDoorServices));
router.post('/services/window-and-door-services', asyncErrorHandler(windowDoorServices));

/* GET services/flooring-services */
router.get('/services/flooring-services', asyncErrorHandler(flooringServices));
router.post('/services/flooring-services', asyncErrorHandler(flooringServices));

/* GET services/general-remodeling */
router.get('/services/general-remodeling', asyncErrorHandler(generalRemodeling));
router.post('/services/general-remodeling', asyncErrorHandler(generalRemodeling));

/* GET services/carpenters-services */
router.get('/services/carpenters-services', asyncErrorHandler(carpentersServices));
router.post('/services/carpenters-services', asyncErrorHandler(carpentersServices));

/* GET services/towing-services */
router.get('/services/towing-services', asyncErrorHandler(towingServices));
router.post('/services/towing-services', asyncErrorHandler(towingServices));

/* GET services/oil-and-fluid-exchange */
router.get('/services/oil-and-fluid-exchange', asyncErrorHandler(oilAndFluidExchange));
router.post('/services/oil-and-fluid-exchange', asyncErrorHandler(oilAndFluidExchange));

/* GET services/body-shop */
router.get('/services/body-shop', asyncErrorHandler(bodyShop));
router.post('/services/body-shop', asyncErrorHandler(bodyShop));

/* GET services/mufflers-and-exhaust */
router.get('/services/mufflers-and-exhaust', asyncErrorHandler(mufflersAndExhaust));
router.post('/services/mufflers-and-exhaust', asyncErrorHandler(mufflersAndExhaust));

/* GET services/suspension-services */
router.get('/services/suspension-services', asyncErrorHandler(suspensionServices));
router.post('/services/suspension-services', asyncErrorHandler(suspensionServices));

/* GET services/brake-change */
router.get('/services/brake-change', asyncErrorHandler(brakeChange));
router.post('/services/brake-change', asyncErrorHandler(brakeChange));

/* GET services/alarm-installation */
router.get('/services/alarm-installation', asyncErrorHandler(alarmInstallation));
router.post('/services/alarm-installation', asyncErrorHandler(alarmInstallation));

/* GET services/engine-diagnostic */
router.get('/services/engine-diagnostic', asyncErrorHandler(engineDiagnostic));
router.post('/services/engine-diagnostic', asyncErrorHandler(engineDiagnostic));

/* GET services/heating-and-cooling */
router.get('/services/heating-and-cooling', asyncErrorHandler(heatingAndCooling));
router.post('/services/heating-and-cooling', asyncErrorHandler(heatingAndCooling));

/* GET services/wheel-and-tire */
router.get('/services/wheel-and-tire', asyncErrorHandler(wheelAndTire));
router.post('/services/wheel-and-tire', asyncErrorHandler(wheelAndTire));

/* GET services/check-engine-light */
router.get('/services/check-engine-light', asyncErrorHandler(checkEngineLight));
router.post('/services/check-engine-light', asyncErrorHandler(checkEngineLight));

/* GET services/battery-services */
router.get('/services/battery-services', asyncErrorHandler(batteryServices));
router.post('/services/battery-services', asyncErrorHandler(batteryServices));

/* GET services/window-tinting */
router.get('/services/window-tinting', asyncErrorHandler(windowTinting));
router.post('/services/window-tinting', asyncErrorHandler(windowTinting));

/* GET services/general-handyman */
router.get('/services/general-handyman', asyncErrorHandler(generalHandyman));
router.post('/services/general-handyman', asyncErrorHandler(generalHandyman));

/* GET services/general-contractor */
router.get('/services/general-contractor', asyncErrorHandler(generalContractor));
router.post('/services/general-contractor', asyncErrorHandler(generalContractor));

/* GET services/electrical-services */
router.get('/services/electrical-services', asyncErrorHandler(electricalServices));
router.post('/services/electrical-services', asyncErrorHandler(electricalServices));

/* GET services/moving-services */
router.get('/services/moving-services', asyncErrorHandler(movingServices));
router.post('/services/moving-services', asyncErrorHandler(movingServices));

/* GET services/building-security */
router.get('/services/building-security', asyncErrorHandler(buildingSecurity));
router.post('/services/building-security', asyncErrorHandler(buildingSecurity));

/* GET services/demolition-services */
router.get('/services/demolition-services', asyncErrorHandler(demolitionServices));
router.post('/services/demolition-services', asyncErrorHandler(demolitionServices));

/* GET services/appliance-repairs */
router.get('/services/appliance-repairs', asyncErrorHandler(applianceRepairs));
router.post('/services/appliance-repairs', asyncErrorHandler(applianceRepairs));

/* GET services/locksmith-services */
router.get('/services/locksmith-services', asyncErrorHandler(locksmithServices));
router.post('/services/locksmith-services', asyncErrorHandler(locksmithServices));

/* GET services/fleet-services */
router.get('/services/fleet-services', asyncErrorHandler(fleetServices));
router.post('/services/fleet-services', asyncErrorHandler(fleetServices));

/* GET services/roofing-services */
router.get('/services/roofing-services', asyncErrorHandler(roofingServies));

/* POST services/roofing-services */
router.post('/services/roofing-services', asyncErrorHandler(roofingServies));

/* GET forgot */
router.get('/forgot-password', getForgotPw);

/* PUT forgot */
router.put('/forgot-password', asyncErrorHandler(putForgotPw));

/* GET /reset/:token */
router.get('/reset/:token', asyncErrorHandler(getReset));

/* PUT /reset/:token */
router.put('/reset/:token', asyncErrorHandler(putReset));

/* POST /likes/:id */
router.post('/likes/:id', isLoggedIn, asyncErrorHandler(likes));

/* POST /unlike/:id */
router.post('/unlike/:id', isLoggedIn, asyncErrorHandler(unlike));

/* POST /save-to-list/:id */
router.post('/save-to-list/:companyId/:listId', isLoggedIn, asyncErrorHandler(saveToList));

/* POST /save-to-list/:id */
router.post('/default-list/:companyId', isLoggedIn, asyncErrorHandler(defaultList));

/* POST /remove-from-list/:id */
router.delete('/remove-from-list/:id', isLoggedIn, asyncErrorHandler(removeFromList));


/* De-activate account */
router.put('/deactivate', isLoggedIn, asyncErrorHandler(deactivateAccount));

/* GET Activate account */
router.get('/activate/:token', asyncErrorHandler(activateAccount));

/* POST /likes/:id */
router.post('/create-list', isLoggedIn, asyncErrorHandler(createList));

/* Delete /delete-list */
router.delete('/delete-list/:id', isLoggedIn, asyncErrorHandler(deleteList));

/* Delete /delete-list */
router.delete('/remove-company/:companyId/:listId', isLoggedIn, asyncErrorHandler(removeCompanyFromList));

/* GET /saved-list-item */
router.get('/saved-list-item', isLoggedIn, asyncErrorHandler(getSavedListItems));

/* GET /other-lists */
router.get('/other-lists/:id', isLoggedIn, asyncErrorHandler(getOtherListItems));

/* GET /saved-list*/
router.get('/saved-list', isLoggedIn, asyncErrorHandler(getSavedList));

/* Security Question */
router.put('/security-question', isLoggedIn, asyncErrorHandler(putSecurityQuestion));

/* Billing info*/
router.put('/billing-info', isLoggedIn, asyncErrorHandler(putBilling));

module.exports = router;
