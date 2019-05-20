const express = require('express');
const passport = require('passport');

const router = express.Router();

const mailboxesController = require('../controllers/mailboxesController');

const { getMailbox, createMailbox, deleteMailbox } = mailboxesController();

router.route('/').get(passport.authenticateUser, createMailbox, getMailbox)
  .delete(passport.authenticateUser, deleteMailbox);

module.exports = router;
