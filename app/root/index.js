const express = require('express');

const router = express.Router();

// TODO: enforce Google OAuth 2.0 authentication on all routes (except authentication)

router.route('/').get((req, res) => {
  // TODO: redirect to /login if user is not logged in
  // TODO: otherwise, redirect to /mailbox
});

router.route('/session').get((req, res) => {
  // TODO: show template for logging in via Google OAuth 2.0
  res.send('login');
}).post((req, res) => {
  // TODO: upon success, check if mailbox is already created
  res.send('logged in');
}).delete((req, res) => {
  // TODO: logut user
  res.send('logged out');
});

router.route('/mailbox').get((req, res) => {
  // TODO: otherwise, display mailbox status (thread/message counts, last updated, etc)
  res.send('mailbox data');
}).delete((req, res) => {
  // TODO: clear mailbox data (wipe everything)
  // TODO: log user out, and redirect to /login
  res.send('mailbox deleted');
});

module.exports = router;
