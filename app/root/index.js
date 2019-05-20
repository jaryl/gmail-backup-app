const express = require('express');
const passport = require('passport');

const passportInitializer = require('./passport');

// const debug = require('debug')('app:root:index');

const router = express.Router();

const sessionsController = require('./controllers/sessionsController');
const mailboxesController = require('./controllers/mailboxesController');

const { getLogin, postLogin, deleteLogout } = sessionsController();
const { getMailbox, createMailbox, deleteMailbox } = mailboxesController();

// TODO: enforce Google OAuth 2.0 authentication on all routes (except authentication)

const AUTH_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/gmail.readonly',
];

function rootRouter(app) {
  passportInitializer(app);

  router.route('/').get((req, res) => {
    // TODO: redirect to /login if user is not logged in
    // TODO: otherwise, redirect to /mailbox
    res.send('root');
  });

  router.route('/session').get(getLogin)
    .delete(deleteLogout);

  router.get('/auth/google',
    passport.authenticate('google', { scope: AUTH_SCOPES }));

  router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/session' }), postLogin);

  router.route('/mailbox').get(createMailbox, getMailbox)
    .delete(deleteMailbox);

  return router;
}

module.exports = rootRouter;
