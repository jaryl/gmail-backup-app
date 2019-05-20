const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
// const debug = require('debug')('app:root:index');

const app = express();
const passportConfig = require('./config/passport');
const sessionConfig = require('./config/session')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passportConfig.setup();

app.set('views', [path.join(__dirname, '/views')]);
app.set('view engine', 'ejs');

const router = require('./routes');

app.use(router);

module.exports = app;
