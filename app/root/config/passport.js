const passport = require('passport');
const debug = require('debug')('app:root:config:passport');

const { GoogleToken } = require('../../../models/');
const GoogleStrategy = require('./google.strategy');

const AUTH_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/gmail.readonly',
];

function setup() {
  passport.serializeUser((tokenID, done) => {
    done(null, tokenID);
  });

  passport.deserializeUser((tokenID, done) => {
    (async function getToken() {
      try {
        const token = await GoogleToken.findByPk(tokenID);
        done(null, token);
      } catch (error) {
        debug(`Error deserializing token ${tokenID}: ${error}`);
        done(error);
      }
    }());
  });

  passport.authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth');
    return false;
  };

  passport.alreadyAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/mailbox');
    return false;
  };

  GoogleStrategy.setup();
}

function scopes() {
  return AUTH_SCOPES;
}

module.exports = { setup, scopes };
