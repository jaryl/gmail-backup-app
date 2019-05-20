const express = require('express');
const passport = require('passport');

const router = express.Router();

const sessionsController = require('../controllers/sessionsController');
const scopes = require('../config/passport').scopes();

const { getLogin, postLogin, deleteLogout } = sessionsController();

// router.route('/').get(passport.alreadyAuthenticated, getLogin)
//   .delete(passport.authenticateUser, deleteLogout);

router.route('/').get(passport.alreadyAuthenticated,
  getLogin);

router.route('/logout').get(passport.authenticateUser,
  deleteLogout); // TODO: support only DELETE requests

router.get('/google', passport.alreadyAuthenticated,
  passport.authenticate('google', { scope: scopes }));

router.get('/google/callback', passport.alreadyAuthenticated,
  passport.authenticate('google', { failureRedirect: '/session' }), postLogin);

module.exports = router;
