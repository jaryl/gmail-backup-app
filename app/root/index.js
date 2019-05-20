const express = require('express');
const path = require('path');
const passport = require('passport');
// const debug = require('debug')('app:root:index');

const router = require('./routes');
const passportConfig = require('./passport');

const app = express();

app.set('views', [path.join(__dirname, '/views')]);
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

passportConfig.setup();

app.use('/', router);

module.exports = app;
