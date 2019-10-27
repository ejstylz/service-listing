var express = require('express');
var router = express.Router();
const { postSignUp, postLogin, getLogout, getSignup, getLogin } = require('../controllers');
const { asyncErrorHandler } = require('../middleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'GABAZZO' });
});

/* GET sign-up */
router.get('/sign-up', getSignup);

/* POST /sign-up */
router.post('/sign-up', asyncErrorHandler(postSignUp));

/* GET /login */
router.get('/login', getLogin);


/* POST /login */
router.post('/login', postLogin);

/* GET /logout */
router.get('/logout', getLogout);

module.exports = router;
