const express = require('express');

const router = express.Router();

// TODO: enforce Google OAuth authentication on all routes (except registration)

router.route('/').get((req, res) => {
  res.send('root');
});

module.exports = router;
