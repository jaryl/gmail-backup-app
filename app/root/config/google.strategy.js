const passport = require('passport');
const debug = require('debug')('app:root:config:google.strategy');

const { Strategy } = require('passport-google-oauth20');

const { GoogleToken } = require('../../../models/');
const credentials = require('./credentials');

function setup() {
  passport.use(new Strategy({
    clientID: credentials.installed.client_id,
    clientSecret: credentials.installed.client_secret,
    callbackURL: '/auth/google/callback',
  }, (accessToken, refreshToken, profile, callback) => {
    GoogleToken.create({
      googleId: profile.id,
      accessToken,
      refreshToken,
    }).then((token) => {
      callback(null, token.id);
    }).error(callback);
  }));
}

module.exports = { setup };
