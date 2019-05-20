const express = require('express');

const router = express.Router();

const authRouter = require('./authRouter');
const mailboxRouter = require('./mailboxRouter');

router.route('/').get((req, res) => {
  // TODO: show home page, which links to admin backend, or to frontend app
  res.send('root');
});

router.use('/auth', authRouter);
router.use('/mailbox', mailboxRouter);

module.exports = router;
