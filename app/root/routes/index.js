const express = require('express');

const router = express.Router();

const authRouter = require('./authRouter');
const mailboxRouter = require('./mailboxRouter');

router.route('/').get((req, res) => {
  // TODO: redirect to /login if user is not logged in
  // TODO: otherwise, redirect to /mailbox
  res.send('root');
});

router.use('/auth', authRouter);
router.use('/mailbox', mailboxRouter);

module.exports = router;
