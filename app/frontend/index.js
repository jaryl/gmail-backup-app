const express = require('express');

const router = express.Router();

// TODO: serve entire Vue.js app

router.route('/').get((req, res) => {
  res.send('frontend');
});

module.exports = router;
