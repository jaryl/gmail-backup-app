const passport = require('passport');
const debug = require('debug')('app:root:config:passport');

const { GoogleToken } = require('../../../models/');
const GoogleStrategy = require('./google.strategy');

function setup() {
  passport.serializeUser((tokenID, done) => {
    done(null, tokenID);
  });

  passport.deserializeUser((tokenID, done) => {
    GoogleToken.findByPk(tokenID)
      .then(token => done(null, token))
      .catch((err) => {
        debug(`Error deserializing token ${tokenID}: ${err}`);
        done(err);
      });
  });

  passport.authenticateUser = (req, res, next) => (req.isAuthenticated() ? next() : res.redirect('/auth'));
  passport.alreadyAuthenticated = (req, res, next) => (!req.isAuthenticated() ? next() : res.redirect('/mailbox'));

  GoogleStrategy.setup();
}

module.exports = { setup };
