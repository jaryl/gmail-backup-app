const express = require('express');

const router = express.Router();

// TODO: enforce JWT authentication on all routes

router.route('/').get((req, res) => {
  res.send('api');
});

module.exports = router;
