const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const debug = require('debug')('app:root:passport');

const credentials = require('./config/credentials');

module.exports = function initializePassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new Strategy({
    clientID: credentials.installed.client_id,
    clientSecret: credentials.installed.client_secret,
    callbackURL: '/auth/google/callback',
  }, (accessToken, refreshToken, profile, callback) => {
    const data = {
      googleId: profile.id,
      email: profile.emails[0].value,
      accessToken,
      refreshToken,
    };
    return callback(null, data);
  }));

  passport.serializeUser((user, done) => {
    // TODO: store to session, or persist to db?
    done(null, user.googleId);
  });

  passport.deserializeUser((googleId, done) => {
    debug(googleId);
    // TODO: figure out what to do here
    done(null, googleId);
  });

};
