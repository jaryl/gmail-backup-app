const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
// const debug = require('debug')('app:root:index');

const app = express();
const passportConfig = require('./config/passport');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

passportConfig.setup();

app.set('views', [path.join(__dirname, '/views')]);
app.set('view engine', 'ejs');

const router = require('./routes');

app.use(router);

module.exports = app;
