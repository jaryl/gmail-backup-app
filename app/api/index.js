const express = require('express');
const passport = require('passport');

const router = express.Router();

// TODO: enforce JWT authentication on all routes

function apiRouter(app) {
  app.use(passport.initialize());

  router.route('/').get((req, res) => {
    res.send('api');
  });
  return router;
}

module.exports = apiRouter;
