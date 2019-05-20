const express = require('express');
const passport = require('passport');

const router = express.Router();

// TODO: serve entire Vue.js app

function frontendRouter(app) {
  app.use(passport.initialize());

  router.route('/').get((req, res) => {
    res.send('frontend');
  });
  return router;
}

module.exports = frontendRouter;
