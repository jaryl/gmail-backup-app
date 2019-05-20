const passport = require('passport');
const debug = require('debug')('app:root:config:google.strategy');

const { Strategy } = require('passport-google-oauth20');

const { GoogleToken } = require('../../../models/');

function setup() {
  passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, callback) => {
    GoogleToken.create({
      googleId: profile.id,
      accessToken,
      refreshToken,
    })
      .then(token => callback(null, token.id))
      .catch((err) => {
        debug(`Error saving GoogleToken: ${err}`);
        callback(err);
      });
  }));
}

module.exports = { setup };
