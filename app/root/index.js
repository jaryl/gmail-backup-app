const express = require('express');

const router = express.Router();

// TODO: enforce Google OAuth 2.0 authentication on all routes (except authentication)

const sessionsController = require('./controllers/sessionsController');
const mailboxesController = require('./controllers/mailboxesController');

const { getLogin, postLogin, deleteLogout } = sessionsController();
const { getMailbox, deleteMailbox } = mailboxesController();

router.route('/').get((req, res) => {
  // TODO: redirect to /login if user is not logged in
  // TODO: otherwise, redirect to /mailbox
  res.send('root');
});

router.route('/session').get(getLogin)
  .post(postLogin)
  .delete(deleteLogout);

router.route('/mailbox').get(getMailbox)
  .delete(deleteMailbox);

module.exports = router;
