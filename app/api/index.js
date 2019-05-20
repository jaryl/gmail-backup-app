const express = require('express');
const passport = require('passport');

// TODO: enforce JWT authentication on all routes

const app = express();

const router = require('./routes');
const passportConfig = require('./passport');

app.use(passport.initialize());

passportConfig.setup();

app.use('/', router);

module.exports = app;
