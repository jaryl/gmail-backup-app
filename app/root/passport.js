const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const debug = require('debug')('app:root:passport');

const credentials = require('./config/credentials');

function setup() {
  passport.use(new Strategy({
    clientID: credentials.installed.client_id,
    clientSecret: credentials.installed.client_secret,
    callbackURL: '/auth/google/callback',
  }, (accessToken, refreshToken, profile, callback) => {
    debug(`Received passport proofile: ${profile}`);
    const data = {
      googleId: profile.id,
      email: profile.emails[0].value,
      accessToken,
      refreshToken,
    };
    return callback(null, data);
  }));

  passport.serializeUser((user, done) => {
    debug(`Serializing: ${user}`);
    // TODO: store to session, or persist to db?
    done(null, user.googleId);
  });

  passport.deserializeUser((googleId, done) => {
    debug(`Deserializing: ${googleId}`);
    // TODO: figure out what to do here
    done(null, googleId);
  });
}

module.exports = { setup };
